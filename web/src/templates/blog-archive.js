import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/shared/graphql-error-list'
import Seo from '../components/layout/seo'
import Layout from '../containers/layout'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'

import BlogArchives from '../components/BlogArchives'

export const query = graphql`

  query BlogArchiveTemplateQuery($skip: Int!, $limit: Int!, $currentDatetime: Date!, $language: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description{
        locale(language: $language)
      }
    }

    blog: allSanityBlog(
      limit: $limit
      skip: $skip
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDatetime }, settings:{ languages: { in: [$language] } } }
    ){
      edges {
        node {
          id
          _type
          publishedAt
          title{
            locale(language: $language)
          }
          slug {
            current
          }
          mainImage{
            alt{
              locale(language: $language)
            }
            asset {
              id
              fluid( maxWidth: 1024, maxHeight: 400 ) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

const BlogArchivesTemplate = props => {
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
      {errors && <Seo title='GraphQL Error' />}
      <Seo
        title={site.title}
        description={site.description.locale}
      />

      {errors && (
        <GraphQLErrorList errors={errors} />
      )}

      {blogNodes &&
        <BlogArchives
          nodes={blogNodes}
          currentPage={currentPage}
          numPages={numPages}
        />}

    </Layout>
  )
}

export default BlogArchivesTemplate
