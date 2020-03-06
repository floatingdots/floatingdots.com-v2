import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'

import Layout from '../containers/layout'
import SEO from '../components/layout/seo'
import Careers from '../components/Careers'
import {toPlainText} from '../lib/helpers'

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

  query CareersTemplateQuery($id: String!, $language: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description{
        locale(language: $language)
      }
    }

    post: sanityCareers(id: {eq: $id}) {
      publishedAt
      slug {
        current
      }
      title{
        locale(language: $language)
      }
      excerpt{
        locale(language: $language)
      }
      body{
        locale(language: $language)
      }
    }
  }
`

const CareersTemplate = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const post = data && data.post

  return (
    <Layout>
      {errors && (
        <GraphQLErrorList errors={errors} />
      )}
      {post && <SEO title={post.title.locale || 'Untitled'} description={(post.excerpt && post.excerpt.locale && toPlainText(post.excerpt.locale)) || ''} image={post.mainImage} />}
      {post && <Careers {...post} />}

    </Layout>
  )
}

export default CareersTemplate
