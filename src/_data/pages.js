const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../../utils/sanityClient.js')
const serializers = require('../../utils/serializers')
const overlayDrafts = require('../../utils/overlayDrafts')
const hasToken = !!client.config().token

function generatePages (pages) {
  return {
    ...pages,
    body: BlocksToMarkdown(pages.body, { serializers, ...client.config() })
  }
}

async function getPages () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[ _type == "pages" && defined(slug)]`
  const projection = groq`{
    meta{
      title,
      description
    },
    title,
    slug,
    headline,
    summary,
    mainImage,
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
  const preparePages = reducedDocs.map(generatePages)
  return preparePages
}

module.exports = getPages