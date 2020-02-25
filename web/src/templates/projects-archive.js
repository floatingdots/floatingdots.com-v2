import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'
import SEO from '../components/layout/seo'
import Layout from '../containers/layout'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

import ProjectsArchives from '../components/ProjectsArchives'

export const query = graphql`

  query ProjectsArchiveTemplateQuery($skip: Int!, $limit: Int!, $currentDatetime: Date!, $language: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description{
        locale(language: $language)
      }
    }

    projects: allSanityProjects(
      limit: $limit
      skip: $skip
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDatetime } }
    ){
      edges {
        node {
          _type
          _id
          publishedAt
          title{
            locale(language: $language)
          }
          slug {
            current
          }
          mainImage{
            asset {
              fluid(maxWidth: 720) {
                ...GatsbySanityImageFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`

const ProjectsArchivesTemplate = props => {
  const {data, errors} = props

  const site = (data || {}).site
  const projectsNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  const {currentPage, numPages} = props.pageContext

  return (

    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      <SEO
        title={site.title}
        description={site.description}
      />

      {errors && (
        <GraphQLErrorList errors={errors} />
      )}

      {projectsNodes &&
        <ProjectsArchives
          nodes={projectsNodes}
          currentPage={currentPage}
          numPages={numPages}
        />
      }

    </Layout>
  )
}

export default ProjectsArchivesTemplate
