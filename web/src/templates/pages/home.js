import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../../lib/helpers'
import GraphQLErrorList from '../../components/shared/graphql-error-list'

import Seo from '../../components/layout/seo'
import Layout from '../../containers/layout'

import Divider from '../../components/shared/divider'
import Intro from '../../components/Home/intro'
import WeLove from '../../components/Home/weLove'
import ProjectsList from '../../components/Home/projects-list'
import BlogList from '../../components/Home/blog-list'
import Contact from '../../components/Home/contact'

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

  query HomePageQuery( $language: String!, $currentDatetime: Date!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
    }
    projects: allSanityProjects(
      limit: 5
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDatetime } }
    ) {
      edges {
        node {
          id
          title{
            locale(language: $language)
          }
          publishedAt
          slug{
            current
          }
          mainImage{
            asset {
              id
              fluid(maxWidth: 740) {
                ...GatsbySanityImageFluid
              }
            }
            alt{
                locale(language: $language)
            }
          }
        }
      }
    }
    blog: allSanityBlog(
      limit: 3
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDatetime }, settings:{ languages: { in: [$language] } } }
    ) {
      edges {
        node {
          id
          title{
            locale(language: $language)
          }
          publishedAt
          slug{
            current
          }
          mainImage{
            asset {
              id
              fluid(maxWidth: 1024, maxHeight: 400) {
                ...GatsbySanityImageFluid
              }
            }
            alt{
              locale(language: $language)
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
  const projectsNode = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  const blogNode = (data || {}).blog
    ? mapEdgesToNodes(data.blog)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  return (
    <Layout isHome>
      <Seo
        title={site.title}
        description={site.description.locale}
      />
      <Intro intro={site.homeIntro.locale} />
      <Divider />
      {projectsNode && (
        <ProjectsList
          nodes={projectsNode}
        />
      )}
      <Divider />
      <WeLove />
      {/* <Divider /> */}
      {/* {blogNode && (
        <BlogList
          nodes={blogNode}
        />
      )} */}
      <Divider />
      <Contact />
    </Layout>
  )
}

export default IndexPage
