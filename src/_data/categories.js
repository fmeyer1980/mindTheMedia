const client = require('../../utils/sanityClient.js')

async function getCategories() {
    const categories = await client
    .fetch(`*[_type == "categories" && defined(slug) && !(_id in path("drafts.**")) ]{
        name,
        slug,
        "children": *[_type == "posts" && ^._id in categoriesPage[]._ref]{
            name,
            slug,
        }
    }`)
    .catch((err) => console.error(err));
    // console.log(JSON.stringify(categories, null, 2));
    return categories;
}

module.exports = getCategories