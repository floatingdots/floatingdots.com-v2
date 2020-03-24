import {format, formatDistanceToNow, differenceInDays, parseISO, isFuture} from 'date-fns'
import ja from 'date-fns/locale/ja'

export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes (data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsDraft ({_id}) {
  return _id.indexOf('drafts.') !== 0
}

export function filterOutDocsWithoutSlugs ({slug}) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture ({publishedAt}) {
  return !isFuture(parseISO(publishedAt))
}

export function getLocaleUrl (slug, locale) {
  return locale === 'en' ? `/${slug}` : `/${locale}/${slug}`
}

export function getBlogUrl (publishedAt, slug, locale) {
  return locale === 'en' ? `/blog/${format(parseISO(publishedAt), 'yyyy/MM')}/${slug.current || slug}/` : `/${locale}/blog/${format(parseISO(publishedAt), 'yyyy/MM')}/${slug.current || slug}/`
}

export function getProjectsUrl (slug, locale) {
  return locale === 'en' ? `/projects/${slug.current || slug}/` : `/${locale}/projects/${slug.current || slug}/`
}

export function getCareersUrl (slug, locale) {
  return locale === 'en' ? `/careers/${slug.current || slug}/` : `/${locale}/careers/${slug.current || slug}/`
}

export function getPublishdAt (publishedAt, locale) {
  if (locale === 'ja') {
    return `投稿日: ${(
      differenceInDays(parseISO(publishedAt), new Date()) > -1
        ? `${formatDistanceToNow(parseISO(publishedAt), {addSuffix: true, locale: ja})}`
        : format(parseISO(publishedAt), 'yyyy年MM月dd日(iii)', {locale: ja}))}`
  } else {
    return `Posted At: ${(
      differenceInDays(parseISO(publishedAt), new Date()) > -1
        ? `${formatDistanceToNow(parseISO(publishedAt), {addSuffix: true})}`
        : format(parseISO(publishedAt), 'MMM dd, yyyy'))}`
  }
}

export function buildImageObj (source = {asset: {}}) {
  const imageObj = {
    asset: {_ref: source.asset._ref || source.asset._id}
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function toPlainText (blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

// https://www.gatsbyjs.org/blog/2019-03-01-localization-with-gatsby-and-sanity/
export function createLocaleTextGetter (languageCode) {
  const languages = [languageCode, 'en'] // last language in array is default;
  const localize = value => {
    if (Array.isArray(value)) {
      return value.map(v => localize(v, languages))
    } else if (typeof value === 'object') {
      if (typeof value._type === 'undefined') {
        return value
      }
      if (/^locale[A-Z]/.test(value._type)) {
      // if (value._type.includes('locale')) {
        const language = languages.find(lang => value[lang])
        return value[language]
      }
      return Object.keys(value).reduce((result, key) => {
        result[key] = localize(value[key], languages)
        return result
      }, {})
    }
    return value
  }
  return localize
}
