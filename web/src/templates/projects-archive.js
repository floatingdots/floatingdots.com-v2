import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'
import Seo from '../components/layout/seo'
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
          id
          _type
          publishedAt
          title{
            locale(language: $language)
          }
          slug {
            current
          }
          mainImage{
            asset {
              id
              fluid( maxWidth: 740 ) {
                ...GatsbySanityImageFluid
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
      {errors && <Seo title='GraphQL Error' />}
      <Seo
        title={site.title}
        description={site.description.locale}
      />

      {errors && (
        <GraphQLErrorList errors={errors} />
      )}

      {projectsNodes &&
        <ProjectsArchives
          nodes={projectsNodes}
          currentPage={currentPage}
          numPages={numPages}
        />}

    </Layout>
  )
}

export default ProjectsArchivesTemplate
