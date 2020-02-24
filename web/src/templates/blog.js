import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import NewsSingle from '../components/news-single'
import SEO from '../components/seo'
import Layout from '../containers/layout'
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
      heroImage{
        ...SanityImage
        alt
      }
      title
      description{
        locale(language: $language)
      }
    }

    post: sanityBlog(id: {eq: $id}) {
      id
      publishedAt
      mainImage {
        ...SanityImage
        alt
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
      body{
        locale(language: $language)
      }
    }
  }
`

const NewsTemplate = props => {
  const {data, errors} = props
  const post = data && data.post
  const site = data && data.site
  return (
    <Layout>

      {errors && <SEO title='GraphQL Error' />}
      {post && <SEO title={post.title || 'Untitled'} description={toPlainText(post._rawExcerpt)} image={post.mainImage || site.heroImage} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {post && <NewsSingle {...post} />}
    </Layout>
  )
}

export default NewsTemplate
