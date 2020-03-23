// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})
const isProd = process.env.NODE_ENV === 'production'
const clientConfig = require('./lib/client-config')
const feeds = require('./lib/addFeeds')

const siteUrl = 'https://floatingdots.com'
const title = 'Floating Dots'
const desc = 'Floaing Dots is a Digitl and Service Design Studio in NYC.'
const descJa = 'FloatingDotsはデジタルとサービスに特化したニューヨークのデザインスタジオです。'

module.exports = {
  siteMetadata: {
    siteUrl,
    title
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        lang: `en`,
        name: title,
        short_name: title,
        description: desc,
        background_color: `#fafafa`,
        theme_color: `#fafafa`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        localize: [
          {
            start_url: `/ja/`,
            lang: `ja`,
            name: title,
            short_name: title,
            description: descJa
          }
        ]

      }
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        useLangKeyLayout: false,
        prefixDefault: false
      }
    },
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: feeds
    // },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-114705592-1'
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        env: {
          development: {
            policy: [{userAgent: '*', disallow: ['/']}]
          },
          production: {
            policy: [{userAgent: '*', allow: '/'}]
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/404', '/*/404']
      }
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    },
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-recaptcha'
  ]
}
