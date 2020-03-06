import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blog from './documents/blog'
import projects from './documents/projects'
import careers from './documents/careers'
import pages from './documents/pages'
import aboutPage from './documents/pages/about'
import careersPage from './documents/pages/careers'
import category from './documents/category'
import siteSettings from './documents/siteSettings'

import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import bodyImage from './objects/bodyImage'
import mainImage from './objects/mainImage'
import fileDownload from './objects/fileDownload'
import youtube from './objects/youtube'
import localeString from './objects/locale/String'
import localeText from './objects/locale/Text'
import localeShortText from './objects/locale/ShortText'
import localeBodyPortableText from './objects/locale/bodyPortableText'
import localeExcerptPortableText from './objects/locale/excerptPortableText'
import aboutBody from './objects/aboutBody'
import careersBody from './objects/careersBody'

export default createSchema({
  name: 'studio',
  types: schemaTypes.concat([
    siteSettings,
    projects,
    blog,
    careers,
    pages,
    aboutPage,
    careersPage,
    category,
    bodyImage,
    mainImage,
    fileDownload,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,
    youtube,
    localeString,
    localeText,
    localeShortText,
    localeBodyPortableText,
    localeExcerptPortableText,
    aboutBody,
    careersBody
  ])
})
