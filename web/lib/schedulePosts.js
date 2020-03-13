const Airtable = require('airtable')
const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

const {format, isFuture, parseISO} = require('date-fns')
const {formatToTimeZone} = require('date-fns-timezone')

module.exports = async function schedulePosts (graphql, reporter) {
  const result = await graphql(`
    {
      blog: allSanityBlog(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            _type
            id
            publishedAt
            title{
              en
              ja
            }
            slug {
              current
            }
          }
        }
      }
      projects: allSanityProjects(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            _type
            id
            publishedAt
            title{
              en
              ja
            }
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (result.errors) throw result.errors
  const blogs = (result.data.blogs || {}).edges || []
  const projects = (result.data.projects || {}).edges || []
  const postEdges = [...blogs, ...projects]

  postEdges
    .filter(edge => isFuture(parseISO(edge.node.publishedAt)))
    .forEach(edge => {
      const {_type, id, slug = {}, publishedAt, title} = edge.node
      const dateSegment = format(parseISO(publishedAt), 'yyyy/MM')
      const pbNY = formatToTimeZone(publishedAt, 'YYYY/MM/DD HH:mm:ss [GMT]Z (z)', {timeZone: 'America/New_York'})

      let path
      if (_type === 'blog') {
        path = `/blog/${dateSegment}/${slug.current}/`
      } else if (_type === 'projects') {
        path = `/projects/${slug.current}/`
      }

      base('Production').create([
        {
          'fields': {
            'type': _type,
            'id': id,
            'title': title.en || title.ja,
            'publishedAt': publishedAt,
            'publishedAt New York': pbNY,
            'slug': path
          }
        }
      ], (err, records) => {
        if (err) {
          reporter.errors(err)
        }
        records.forEach((record) => {
          let allRedords = []
          base('Production').select({
            view: 'Main',
            maxRecords: 99999,
            filterByFormula: `{id} = '${id}'`
          }).eachPage((records, fetchNextPage) => {
            allRedords = [...allRedords, ...records]
            fetchNextPage()
          }, () => {
            const sortedRecords = allRedords.sort((a, b) => b.fields._autonumber - a.fields._autonumber)
            sortedRecords.forEach((el, i) => {
              if (i !== 0) {
                base('Production').destroy([el.id], (err, deletedRecords) => {
                  if (err) {
                    reporter.error(err)
                  }
                })
              }
            })
            reporter.info(`Scheduled Post ${pbNY}: ${title.en || title.ja}`)
          }
          )
        })
      })
    })
}
