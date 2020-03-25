import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'

import Layout from '../containers/layout'
import SEO from '../components/layout/seo'
import Blog from '../components/Blog'
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

  query NewsTemplateQuery($id: String!, $language: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description{
        locale(language: $language)
      }
    }

    post: sanityBlog(id: {eq: $id}) {
      id
      publishedAt
      mainImage {
        asset {
          id
          fluid( maxWidth: 740 ) {
            ...GatsbySanityImageFluid
          }
        }
        alt{
          locale(language: $language)
        }
        ...SanityImage
      }
      title{
        locale(language: $language)
      }
      slug {
        current
      }
      excerpt{
        locale(language: $language)
      }
      _rawBody(resolveReferences: {maxDepth: 5})
      body{
        locale(language: $language)
      }
    }
  }
`

const BlogTemplate = props => {
  const {data, errors} = props
  const post = data && data.post
  return (
    <Layout>
      {errors && (
        <GraphQLErrorList errors={errors} />
      )}
      {post && <SEO title={post.title.locale || 'Untitled'} description={(post.excerpt && post.excerpt.locale && toPlainText(post.excerpt.locale)) || ''} image={post.mainImage} />}
      {post && <Blog {...post} />}
    </Layout>
  )
}

export default BlogTemplate
