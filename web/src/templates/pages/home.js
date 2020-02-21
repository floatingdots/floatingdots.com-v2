import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../../lib/helpers'
import GraphQLErrorList from '../../components/shared/graphql-error-list'

import SEO from '../../components/layout/seo'
import Layout from '../../containers/layout'

import Divider from '../../components/shared/divider'
import Intro from '../../components/Home/intro'
import ProjectsList from '../../components/Home/projects-list'
import WeLove from '../../components/Home/weLove'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery( $language: String!, $currentDatetime: Date!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
      heroImage {
        ...SanityImage
        alt
      }
    }
    projects: allSanityProjects(
      limit: 5
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDatetime } }
    ) {
      edges {
        node {
          title{
            locale(language: $language)
          }
          publishedAt
          slug{
            current
          }
          mainImage{
            asset {
              fluid(maxWidth: 1024) {
                ...GatsbySanityImageFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectsNode = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  return (
    <Layout isHome>
      <SEO
        title={site.title}
        description={site.description.locale}
      />
      <Intro intro={site.homeIntro.locale} />
      <Divider />
      {projectsNode && (
        <ProjectsList
          nodes={projectsNode}
        />
      )}
      <Divider />
      <WeLove />
      <Divider />

    </Layout>
  )
}

export default IndexPage
