const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../../utils/sanityClient.js')
const serializers = require('../../utils/serializers')
const overlayDrafts = require('../../utils/overlayDrafts')
const hasToken = !!client.config().token

function generateCases (cases) {
  return {
    ...cases,
    body: BlocksToMarkdown(cases.body, { serializers, ...client.config() })
  }
}

async function getCases () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[ _type == "cases" && defined(slug)]`
  const projection = groq`{
    meta{
      title,
      description
    },
    name,
    slug,
    headline,
    summary,
    mainImage,
    bgColor,
    body[]{
      ...,
      children[]{
        ...,
      }
    },
  }`
  const order = `| order(order asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareCases = reducedDocs.map(generateCases)
  return prepareCases
}

module.exports = getCases