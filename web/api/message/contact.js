const serverToken = process.env.POSTMARK_ACCESSTOKEN
const sender = process.env.EMAIL_SENDER
const receiver = process.env.EMAIL_RECEIVER

const postmark = require('postmark')
const client = new postmark.ServerClient(serverToken)

const Airtable = require('airtable')
const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base('apphRckgSl1hxdTOk')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end()
  }
  const {locale, name, email, message} = req.body
  const footer = '--\n.•Floating Dots'
  let m1 = {}
  let m2 = {}

  m1.name = name
  m1.email = email
  m1.subject = `Message from ${name}`
  m1.message = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`

  m2.name = name
  m2.email = email
  if (locale === 'ja') {
    m2.subject = `Floating Dots - お問い合わせありがとうございます。`
    m2.message = `${name}様\n\nこの度はお問い合わせいただきありがとうございます。\n担当者から折り返しご連絡させていただきますので、しばらくお待ちください。\n\nお問い合わせ内容\nお名前: ${name}\nメールアドレス: ${email}\nMessage: ${message}\n\n${footer}`
  } else {
    m2.subject = `Floating Dots - Thank you for your message`
    m2.message = `Hi ${name},\n\nThank you for getting in touch!\nWe appreciate you contacting us. One of our colleagues will get back in touch with you soon!\n\nYour Message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\n${footer}`
  }

  const airtable = base('Contacts').create({
    Name: name,
    Email: email,
    Message: message,
    Body: JSON.stringify(req.body, null, 2)
  }).then((res) => {
    return res
  }).catch((err) => {
    return err
  })

  const emailToUs = client
    .sendEmail({
      From: `Floating Dots<${sender}>`,
      To: receiver,
      ReplyTo: m1.email,
      Subject: m1.subject,
      TextBody: m1.message
    }).then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })

  const emailToClient = client
    .sendEmail({
      From: `Floating Dots<${receiver}>`,
      To: m2.email,
      ReplyTo: receiver,
      Subject: m2.subject,
      TextBody: m2.message
    }).then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })

  await Promise.all([airtable, emailToUs, emailToClient]).then((result) => {
    console.log(result)
    res.json(result)
  }).then((err) => {
    res.status(501).json(err)
  })
}
