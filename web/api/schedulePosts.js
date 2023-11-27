const Airtable = require('airtable')
const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)
const deployWebhook = process.env.NOW_DEPLOY_WEBHOOK

const axios = require('axios')
const parseISO = require('date-fns/parseISO')
const {differenceInMinutes} = require('date-fns')

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end()
  }
  let allRecords = []
  base('Production').select({
    view: 'Main',
    maxRecords: 99999,
    filterByFormula: '{published} != "1"'
  }).eachPage((records, fetchNextPage) => {
    allRecords = [...allRecords, ...records]
    fetchNextPage()
  }, () => {
    const sortedRecords = allRecords.filter(el => differenceInMinutes(parseISO(el.fields.publishedAt), new Date()) <= 0)
    if (sortedRecords.length > 0) {
      sortedRecords.forEach((el) => {
        axios.request({
          method: 'GET',
          baseURL: deployWebhook
        }).then(() => {
          base('Production').update(el.id, {
            published: true
          }, (err, record) => {
            if (err) {
              console.log(err)
              res.status(500).end()
            }
            console.log(`Published: ${record.get('title')}`)
            res.status(201).end()
          })
        }).catch(() => {
          res.status(500).end()
        })
      })
    } else {
      console.log('No scheduled post')
      res.status(201).end()
    }
  })
}
