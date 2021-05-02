const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../../utils/sanityClient.js')
const serializers = require('../../utils/serializers')
const overlayDrafts = require('../../utils/overlayDrafts')
const hasToken = !!client.config().token

function generatePosts (posts) {
  return {
    ...posts,
    body: BlocksToMarkdown(posts.body, { serializers, ...client.config() })
  }
}

async function getPosts () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[ _type == "posts" && defined(slug) && publishedAt < now()]`
  const projection = groq`{
    meta{
      title,
      description
    },
    publishedAt,
    name,
    slug,
    headline,
    summary,
    categoriesPage[]->{
        name,
        slug
    },
    author->,
    mainImage,
    body[]{
      ...,
      children[]{
        ...,
      }
    },
  }`
  const order = `| order(publishedAt desc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const preparePosts = reducedDocs.map(generatePosts)
  return preparePosts
}

module.exports = getPosts