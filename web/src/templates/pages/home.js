import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  filterOutDocsLiveDateInThePast,
  filterOutDocsDraft,
  buildImageObj
} from '../../lib/helpers'
import {imageUrlFor} from '../../lib/image-url'
import GraphQLErrorList from '../../components/shared/graphql-error-list'

import PortableText from '../../components/shared/portableText'
import Container from '../../components/layout/container'
import SEO from '../../components/layout/seo'
import Layout from '../../containers/layout'

import Intro from '../../components/Home/intro'
// import NewsPreviewList from '../../components/home/news-preview-list'

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

  query IndexPageQuery( $language: String) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      homeIntro{
        locale(language: $language)
      }
      description{
        locale(language: $language)
      }
      heroImage {
        ...SanityImage
        alt
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

  // const newsNodes = (data || {}).news
  //   ? mapEdgesToNodes(data.news)
  //     // .filter(filterOutDocsDraft)
  //     .filter(filterOutDocsWithoutSlugs)
  //     .filter(filterOutDocsPublishedInTheFuture)
  //   : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout isHome>
      <SEO
        title={site.title}
        description={site.description.locale}
        // keywords={site.keywords}
      />
      <Container>
        <Intro intro={site.homeIntro.locale} />
        {/* {newsNodes && (
          <NewsPreviewList
            nodes={newsNodes}
          />
        )} */}

        {/* {about && (
          <AboutPreview
            title={about.title}
            titleEn={about.titleEn}
            mainImage={about.mainImage}
            _rawExcerpt={about._rawExcerpt}
          />
        )} */}

      </Container>
    </Layout>
  )
}

export default IndexPage
