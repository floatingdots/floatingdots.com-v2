import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'

import Layout from '../containers/layout'
import SEO from '../components/layout/seo'
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
      heroImage{
        ...SanityImage
        alt
      }
      title
      description{
        locale(language: $language)
      }
    }

    post: sanityProjects(id: {eq: $id}) {
      publishedAt
      mainImage {
        asset {
          fluid(maxWidth: 720) {
            ...GatsbySanityImageFluid_withWebp_noBase64
          }
        }
        ...SanityImage
        alt
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
      body{
        locale(language: $language)
      }
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
  const site = data && data.site

  return (
    <Layout>
      {errors && (
        <GraphQLErrorList errors={errors} />
      )}
      {post && <SEO title={post.title.locale || 'Untitled'} description={toPlainText(post._rawExcerpt)} image={post.mainImage || site.heroImage} />}
      {post && <Projects {...post} />}

    </Layout>
  )
}

export default ProjectsTemplate
