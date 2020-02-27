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

import About from '../../components/About'

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

  query AboutPageQuery( $language: String! ) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
    }
    about: sanityAbout {
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
      body1{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
        }
        mainImage{
          asset {
            fluid(maxWidth: 720) {
              ...GatsbySanityImageFluid_withWebp_noBase64
            }
          }
        }
      }
      body2{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
        }
        mainImage{
          asset {
            fluid(maxWidth: 720) {
              ...GatsbySanityImageFluid_withWebp_noBase64
            }
          }
        }
      }
      body3{
        title{
          locale(language: $language)
        }
        body{
          locale(language: $language)
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
  const page = (data || {}).about
  return (
    <Layout isHome>
      <SEO
        title={site.title}
        description={site.description.locale}
      />
      <About {...page} />
    </Layout>
  )
}

export default IndexPage
