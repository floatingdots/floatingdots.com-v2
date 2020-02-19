import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import {imageUrlFor} from '../../lib/image-url'
import {buildImageObj} from '../../lib/helpers'

function SEO ({description, lang, meta, title, image, robots}) {
  const [hostname, setHostname] = useState('')

  useEffect(() => {
    setHostname(window.location.hostname)
  }, [hostname])

  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.site && data.site.description[lang]) || ''
        const siteTitle = (data.site && data.site.title) || ''
        const siteAuthor = (data.site && data.site.author && data.site.author.name) || ''
        const socialImage = (data.site && data.site.socialImage && data.site.socialImage.asset && data.site.socialImage)
        const metaImage = (image && image.asset) ? imageUrlFor(buildImageObj(image)).width(1200).url() : socialImage ? imageUrlFor(buildImageObj(socialImage)).width(1200).format('jpg').quality(80).url() : ''
        const metaRobots = robots || (hostname && hostname !== 'floatingdots.com' && 'none') || 'all'
        return (
          <Helmet
            title={title}
            titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
            // link={[
            //   {
            //     rel: 'alternate',
            //     type: 'application/rss+xml',
            //     title: 'Floating Dots',
            //     href: 'https://floatingdots.com/rss.xml'
            //   }
            // ]}
            meta={[
              {
                name: 'robots',
                content: metaRobots
              },
              {
                name: 'description',
                content: metaDescription
              },
              {
                property: 'og:title',
                content: title
              },
              {
                property: 'og:description',
                content: metaDescription
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                property: 'og:image',
                content: metaImage
              },
              {
                name: 'twitter:card',
                content: 'summary'
              },
              {
                name: 'twitter:creator',
                content: siteAuthor
              },
              {
                name: 'twitter:title',
                content: title
              },
              {
                name: 'twitter:description',
                content: metaDescription
              }
            ]
              // .concat(
              //   keywords && keywords.length > 0
              //     ? {
              //       name: 'keywords',
              //       content: keywords.join(', ')
              //     }
              //     : []
              // )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  robots: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired
}

export default SEO

const detailsQuery = graphql`
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

  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: {eq: "siteSettings"}) {
      title
      description{
        en
        ja
      }
      socialImage{
        ...SanityImage
      }
    }
  }
`
