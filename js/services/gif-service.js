class GifsService {
  gifsQuantityForOneRequest = 30;
  server = new GiphyApi();
  _searchStartNumber = 0;
  _searchResultArr = [];
  _resultsQuantity;

  getGifsToRender() {
    return new Promise(resolve => {
      const searchText = Utils.getSearchRequestTextFromURL();
      const gifsArrFromCache = cache.getGifsFromCache(searchText);

      if (gifsArrFromCache && (gifsArrFromCache.length >= this.gifsQuantityForOneRequest)) {
        console.log('cache');

        this._addGifsToSeachResultArr(gifsArrFromCache);

        resolve(gifsArrFromCache.slice(0, this.gifsQuantityForOneRequest));
      } else {
        console.log('request');

        this.server.getGifsData(searchText, this.gifsQuantityForOneRequest, this._searchStartNumber)
          .then(gifsObj => {
            const gifs = gifsObj.gifsData;

            this._addGifsToSeachResultArr(gifs);
            cache.addToCache(searchText, gifs);

            this._resultsQuantity = gifsObj.gifsTotalQnty;

            resolve(gifs);
          });
      }
    });
  }

  getAdditionalGifsToRender() {
    return new Promise(resolve => {
      this._getNewSearchStartNumber();

      const gifsToDisplayArr = this._searchResultArr.slice(this._searchStartNumber - 1);

      if (gifsToDisplayArr.length >= this.gifsQuantityForOneRequest) {
        console.log('cache');

        resolve(gifsToDisplayArr.slice(0, this.gifsQuantityForOneRequest));
      } else {
        console.log('request');

        const searchedText = Utils.getSearchRequestTextFromURL();

        this.server.getGifsData(searchedText, this.gifsQuantityForOneRequest, this._searchStartNumber)
          .then(gifsObj => {
            const gifs = gifsObj.gifsData;

            cache.addToCache(searchedText, gifs);
            this._addGifsToSeachResultArr(gifs);

            resolve(gifs);
          });
      }

    });
  }

  getGifToRender() {
    return new Promise(resolve => {
      const gifId = Utils.parseRequestURL().id;
      const gifToRender = cache.getGifFromCache(gifId);

      if (gifToRender) {
        console.log('cache');

        resolve({
          gif: gifToRender,
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
            resolve({
              gif: {},
            });
          });
      }
    });
  }

  areGifsFinished() {
    let areFinished = this._resultsQuantity === this._searchResultArr.length;

    return areFinished;
  }

  _getNewSearchStartNumber() {
    this._searchStartNumber = this._searchStartNumber + this.gifsQuantityForOneRequest + 1;

    return this._searchStartNumber;
  }

  _addGifsToSeachResultArr(gifsArr) {
    this._searchResultArr = [...this._searchResultArr, ...gifsArr];
  }
}