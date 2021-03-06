import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'

import Layout from '../containers/layout'
import Seo from '../components/layout/seo'
import Projects from '../components/Projects'
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

  query ProjectsTemplateQuery($id: String!, $language: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description{
        locale(language: $language)
      }
    }

    post: sanityProjects(id: {eq: $id}) {
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
      slug {
        current
      }
      title{
        locale(language: $language)
      }
      subTitle{
        locale(language: $language)
      }
      platforms
      deliverables
      techs
      url
      excerpt{
        locale(language: $language)
      }
      _rawBody(resolveReferences: {maxDepth: 5})
    }
  }
`

const ProjectsTemplate = props => {
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
      {post && <Seo title={post.title.locale || 'Untitled'} description={(post.excerpt && post.excerpt.locale && toPlainText(post.excerpt.locale)) || ''} image={post.mainImage} />}
      {post && <Projects {...post} />}

    </Layout>
  )
}

export default ProjectsTemplate
