class Cache {
  _cache = {};

  addToCache(searchTextValue, dataArr) {
    const searchText = searchTextValue.toLowerCase();
    const arrInCache= this._cache[searchText];

      if (arrInCache) {
      const arrToAdd = dataArr.filter(gif => !arrInCache.find(gifInCache => gif.id === gifInCache.id));

      this._cache[searchText] = [...arrInCache, ...arrToAdd];
    } else {
      this._cache[searchText] = dataArr;
    }
  }

  getGifFromCache(gifId) {
    for (let key in this._cache) {
      let resultGif = this._cache[key].find(gif => gif.id === gifId);

      if (resultGif) {
        return resultGif;
      }
    }
  }

  getGifsFromCache(searchText) {
    let result = this._cache[searchText.toLowerCase()];

    if (result) {
      return result;
    }
  }
}

const cache = new Cache();