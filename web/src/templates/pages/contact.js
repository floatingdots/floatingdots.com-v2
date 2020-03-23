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

import Contact from '../../components/Contact'

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

  query ContactPageQuery( $language: String! ) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
      address
      email
      googleMaps
    }
    contact: sanityPages(_id: { eq: "contact" }) {
      title{
        locale(language: $language)
      }
      publishedAt
      slug{
        current
      }
      mainImage{
        alt{
          locale(language: $language)
        }
        asset {
          id
          fluid( maxWidth: 740 ) {
            ...GatsbySanityImageFluid
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
  const page = (data || {}).contact
  return (
    <Layout isHome>
      <SEO
        title={site.title}
        description={site.description.locale}
      />
      <Contact {...page} {...site} />
    </Layout>
  )
}

export default IndexPage
