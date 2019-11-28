class SearchResults extends Component {
  constructor() {
    super();
    this.searcher = new MainPage();
    this._gifsQuantityForOneRequest = 30;
    this._searchStartNumber = 0;
    this._searchResultArr = [];
    this._resultsQuantity;
    this.model = new Gifs();
  }

  getData() {
    return new Promise(resolve => {
      const searchText = this.getSearchRequestTextFromUrl();
      let gifsArr = cache.getGifsFromCache(searchText);

      if (gifsArr && (gifsArr.length >= this._gifsQuantityForOneRequest)) {
        console.log('cache');

        this.addToSeachResultArr(gifsArr);

        resolve(gifsArr.slice(0, this._gifsQuantityForOneRequest));
      } else {
        console.log('request');

        this.model.getGifs(this._gifsQuantityForOneRequest, this._searchStartNumber)
          .then(gifsObj => {
            gifsArr = this.filterServerResponse(gifsObj);

            this.addToSeachResultArr(gifsArr);

            cache.addToCache(searchText, gifsArr);

            resolve(gifsArr);
          });
      }
    });
  }

  render(gifs) {
    return new Promise(resolve => {
      let gifsHtml;
      let showMoreBtnHTML;


      if (gifs.length) {
        gifsHtml = this.getGifsHTML(gifs);
        showMoreBtnHTML = '<button class="collection__btn">Show more</button>';
      } else {
        gifsHtml = '<p class ="error-message">No GIFs are found</p>';
        showMoreBtnHTML = '';
      }

      const html = `${this.searcher.mainPageHtml}
        <div class = "collection-wrapper">
          <div class = "collection">
            ${gifsHtml}
          </div>
          ${showMoreBtnHTML}
        </div>`;

      resolve(html);
    });

  }

  afterRender() {
    this.setActions();
    this.searcher.setActions();
    this.setSearcherRequestValue();
    this.makeSearchBtnValid();
    this.validateShowMoreBtn();
  }

  setActions() {
    const showMoreBtn = document.getElementsByClassName('collection__btn')[0];
    const gifsCollectionBox = document.getElementsByClassName('collection')[0];

    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        let gifsArr;

        this.getNewSearchStartNumber();

        const gifsToDisplayArr = this._searchResultArr.slice(this._searchStartNumber - 1);

        if (gifsToDisplayArr.length >= this._gifsQuantityForOneRequest) {
          console.log('cache');

          gifsArr = gifsToDisplayArr;

          this.showAdditionalGifs(gifsArr.slice(0, this._gifsQuantityForOneRequest), gifsCollectionBox);
        } else {
          console.log('request');

          this.model.getGifs(this._gifsQuantityForOneRequest, this._searchStartNumber)
            .then(gifsObj => {
              gifsArr = this.filterServerResponse(gifsObj);

              cache.addToCache(this.getSearchRequestTextFromUrl(), gifsArr);

              this.addToSeachResultArr(gifsArr);
              this.showAdditionalGifs(gifsArr, gifsCollectionBox);
            });
        }

        this.validateShowMoreBtn();
      });
    }
  }

  showAdditionalGifs(gifsArr, box) {
    const gifsHtml = this.getGifsHTML(gifsArr);

    box.insertAdjacentHTML('beforeend', `${gifsHtml}`);
  }

  getGifsHTML(gifsArr) {
    const gifsCollectionHtmlArr = [];

    gifsArr.forEach(gif => gifsCollectionHtmlArr.push(`<a class="collection__link" href="#/gif/${gif.id}"><img class="collection__img" 
    src="${gif.urlForPreview}" alt="${gif.title}"></a>`));

    return gifsCollectionHtmlArr.join('\n');
  }

  getSearchRequestTextFromUrl() {
    const searchText = Utils.parseRequestURL().resource.replace('search?q=', '').replace(/%20/g, ' ');

    return searchText;
  }

  setSearcherRequestValue() {
    const searchTextField = document.getElementsByClassName('searcher__field')[0];

    searchTextField.value = this.getSearchRequestTextFromUrl();
  }

  makeSearchBtnValid() {
    const searchBtn = document.getElementsByClassName('searcher__btn')[0];

    searchBtn.disabled = false;
  }

  filterServerResponse(response) {
    this._resultsQuantity = response.pagination.total_count;

    const filteredArr = response.data.map(val => {
      return {
        id: val.id,
        author: val.username || 'no data',
        title: val.title,
        creationDate: val.import_datetime,
        urlForOriginalSize: val.images.original.url,
        urlForPreview: val.images.preview_gif.url,
      };
    });

    return filteredArr;
  }

  getNewSearchStartNumber() {
    let newStartNumber = this._searchStartNumber + this._gifsQuantityForOneRequest + 1;

    this._searchStartNumber = newStartNumber;

    return newStartNumber;
  }

  addToSeachResultArr(gifsArr) {
    this._searchResultArr = [...this._searchResultArr, ...gifsArr];
  }

  areGifsFinished() {
    let areFinished = this._resultsQuantity === this._searchResultArr.length;

    return areFinished;
  }

  validateShowMoreBtn() {
    const showMoreBtn = document.getElementsByClassName('collection__btn')[0];

    if (!showMoreBtn) return;

    showMoreBtn.disabled = this.areGifsFinished() 
      ? true 
      : false;
  }
}