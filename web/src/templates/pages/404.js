import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../../components/shared/graphql-error-list'

import SEO from '../../components/layout/seo'
import Layout from '../../containers/layout'

import _404 from '../../components/_404'

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

  query _404PageQuery( $language: String! ) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
    }
  }
`

const _404Page = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  return (
    <Layout isHome>
      <SEO
        title={site.title}
        description={site.description.locale}
      />
      <_404 />
    </Layout>
  )
}

export default _404Page
