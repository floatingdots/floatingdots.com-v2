import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'
import SEO from '../components/layout/seo'
import Layout from '../containers/layout'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

import BlogArchive from '../components/Blog/blog-archive-list'

export const query = graphql`

  query BlogArchiveTemplateQuery($skip: Int!, $limit: Int!, $currentDatetime: Date!, $language: String!) {
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

    blog: allSanityBlog(
      limit: $limit
      skip: $skip
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
          mainImage{
            asset {
              fluid(maxWidth: 1024, maxHeight: 400) {
                ...GatsbySanityImageFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`

const NewsTemplate = props => {
  const {data, errors} = props

  const site = (data || {}).site
  const blogNodes = (data || {}).blog
    ? mapEdgesToNodes(data.blog)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  const {currentPage, numPages} = props.pageContext

  return (

    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />

      {errors && (
        <GraphQLErrorList errors={errors} />
      )}

      {blogNodes && <BlogArchive nodes={blogNodes} currentPage={currentPage} numPages={numPages}
      />}

    </Layout>
  )
}

export default NewsTemplate
