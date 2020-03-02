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

import CareersArchives from '../../components/CareersArchives'

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

  query CareersPageQuery( $language: String!, $currentDatetime: Date! ) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
    }
    careers: sanityCareersPage {
      title{
        locale(language: $language)
      }
      publishedAt
      slug{
        current
      }
      mainImage{
        asset {
          fluid(maxWidth: 720) {
            ...GatsbySanityImageFluid_withWebp_noBase64
          }
        }
      }
      intro{
        locale(language: $language)
      }
      body1{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
        }
      }
      body2{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
        }
      }
      body3{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
        }
      }
      body4{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
        }
      }
    }

    positions: allSanityCareers(
      limit: 99
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
  const page = (data || {}).careers
  const positionsNodes = (data || {}).positions
    ? mapEdgesToNodes(data.positions)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  return (
    <Layout isHome>
      <SEO
        title={site.title}
        description={site.description.locale}
      />
      <CareersArchives {...page} positionsNodes={positionsNodes} />
    </Layout>
  )
}

export default IndexPage
