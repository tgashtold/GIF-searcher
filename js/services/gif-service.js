class GifsService {
  gifsQuantityForOneRequest = 30;
  server = new GiphyApi();
  _searchStartNumber = 0;
  _resultsQuantity;

  getGifs(text) {
    const searchText = text;
    const gifsArrFromCache = cache.getGifsFromCache(searchText);
    const startNumber = this._searchStartNumber;

    this._getNewSearchStartNumber();

    if (gifsArrFromCache && (gifsArrFromCache.slice(startNumber).length >= this.gifsQuantityForOneRequest)) {
      console.log('cache');

      return new Promise(resolve =>
        resolve(gifsArrFromCache.slice(startNumber).slice(0, this.gifsQuantityForOneRequest))
      );
    } else {
      console.log('request');

      return this.server.getGifsData(searchText, this.gifsQuantityForOneRequest, startNumber)
        .then(gifsObj => {
          const gifs = gifsObj.gifsData;

          cache.addToCache(searchText, gifs);

          this._resultsQuantity = gifsObj.gifsTotalQnty;

          return gifs;
        });
    }
  }

  getGif(searchedGifId) {
    const gifId = searchedGifId;
    const gifFromCache = cache.getGifFromCache(gifId);

    if (gifFromCache) {
      console.log('cache');

      return new Promise(resolve => resolve({
        gif: gifFromCache,
      }));
    } else {
      console.log('request');

      return this.server.getGif(gifId)
        .then(gifObj => {
          const linkBack = `#${Routes.mainPage.url}`;

          return {
            gif: gifObj,
            linkBack: linkBack,
          };
        })
    }
  }

  areGifsFinished() {
    let areFinished = this._resultsQuantity === cache.getGifsFromCache(Utils.getSearchRequestTextFromURL()).length;

    return areFinished;
  }

  _getNewSearchStartNumber() {
    this._searchStartNumber = this._searchStartNumber + this.gifsQuantityForOneRequest;

    return this._searchStartNumber;
  }
}