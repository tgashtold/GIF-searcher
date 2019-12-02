class GifsService {
  gifsQuantityForOneRequest = 30;
  server = new GiphyApi();
  _searchStartNumber = 0;
  _resultsQuantity;

  getGifs(text) {
    return new Promise(resolve => {
      const searchText = text;
      const gifsArrFromCache = cache.getGifsFromCache(searchText);
      const startNumber = this._searchStartNumber;

      this._getNewSearchStartNumber();

      if (gifsArrFromCache && (gifsArrFromCache.slice(startNumber).length >= this.gifsQuantityForOneRequest)) {
        console.log('cache');

        resolve(gifsArrFromCache.slice(startNumber).slice(0, this.gifsQuantityForOneRequest));
      } else {
        console.log('request');

        this.server.getGifsData(searchText, this.gifsQuantityForOneRequest, startNumber)
          .then(gifsObj => {
            const gifs = gifsObj.gifsData;

            cache.addToCache(searchText, gifs);

            this._resultsQuantity = gifsObj.gifsTotalQnty;

            resolve(gifs);
          }).catch(() => {
            PagesNavigator.redirectToErrorPage();
          });;
      }
    });
  }

  getGif(searchedGifId) {
    return new Promise(resolve => {
      const gifId = searchedGifId;
      const gifFromCache = cache.getGifFromCache(gifId);

      if (gifFromCache) {
        console.log('cache');

        resolve({
          gif: gifFromCache,
        });
      } else {
        console.log('request');

        this.server.getGif(gifId)
          .then(gifObj => {
            const linkBack = `#${Routes.mainPage.url}`;

            resolve({
              gif: gifObj,
              linkBack: linkBack,
            });
          })
          .catch(() => {
            PagesNavigator.redirectToErrorPage();
          });
      }
    });
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