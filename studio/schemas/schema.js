import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blog from './documents/blog'
import projects from './documents/projects'
import pages from './documents/pages'
import about from './documents/about'
import category from './documents/category'
import siteSettings from './documents/siteSettings'

import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import youtube from './objects/youtube'
import localeString from './objects/locale/String'
import localeText from './objects/locale/Text'
import localeShortText from './objects/locale/ShortText'
import localeBodyPortableText from './objects/locale/bodyPortableText'
import localeExcerptPortableText from './objects/locale/excerptPortableText'
import aboutBody from './objects/aboutBody'

export default createSchema({
  name: 'studio',
  types: schemaTypes.concat([
    siteSettings,
    projects,
    blog,
    pages,
    about,
    category,
    mainImage,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,
    youtube,
    localeString,
    localeText,
    localeShortText,
    localeBodyPortableText,
    localeExcerptPortableText,
    aboutBody
  ])
})
