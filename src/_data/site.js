const groq = require('groq')
const client = require('../../utils/sanityClient.js')
module.exports =  async function() {
  return await client.fetch(groq`
  *[_type == "siteSettings"]{
      name,
      url,
      address,
      zip,
      cvr,
      phone,
      mail,
      ctaText,
      newsletter{
        headline,
        text,
        conditionText,
        image
      }
    }[0]
  `)
}
