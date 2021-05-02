const groq = require('groq')
const client = require('../../utils/sanityClient.js')
module.exports =  async function() {
  return await client.fetch(groq`
  *[_type == "home"]{
    meta{
      title,
      description
    },
    intro{
      headline,
      text,
      linkText,
      linkUrl,
      featuredPages[]->{
        slug,
        name
      },
    },
    featuredCases[]->{
      slug,
      mainImage,
      name,
      headline,
      summary,
      services
    },
    featuredPost->{
      slug,
      mainImage,
      name,
      headline,
      summary
    },
    about{
      headline,
      text,
      link->{
        name,
        slug
      }
    }
    }[0]
  `)
}
