module.exports = {
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },

  getSiblingContent(collection, item, limit = 5, random = true) {
    let filteredItems = collection.filter(x => x.url !== item.url);

    if (random) {
      let counter = filteredItems.length;

      while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = filteredItems[counter];

        filteredItems[counter] = filteredItems[index];
        filteredItems[index] = temp;
      }
    }

    if (limit > 0) {
      filteredItems = filteredItems.slice(0, limit);
    }

    return filteredItems;
  },

  filterCollectionByKeys(collection, keys) {
    return collection.filter(x => keys.includes(x.data.relatedWorkKey));
  }
};
