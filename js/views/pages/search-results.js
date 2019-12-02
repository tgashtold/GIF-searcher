class SearchResults extends Component {
    searcher = new MainPage();
    gifsService = new GifsService();

    getData() {
        return this.gifsService.getGifs(Utils.getSearchRequestTextFromURL());
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

            const html = `${this.searcher.getMainPageHtml()}
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
                this.gifsService.getGifs(Utils.getSearchRequestTextFromURL()).then(gifs => {
                    this.showAdditionalGifs(gifs, gifsCollectionBox);

                    this.validateShowMoreBtn();
                });
            });
        }
    }

    showAdditionalGifs(gifsArr, box) {
        const gifsHtml = this.getGifsHTML(gifsArr);

        box.insertAdjacentHTML('beforeend', `${gifsHtml}`);
    }

    getGifsHTML(gifsArr) {
        const gifsCollectionHtml = gifsArr.map(gif => {
            return `<a class="collection__link" href="#/gif/${gif.id}"><img class="collection__img" src="${gif.urlForPreview}" alt="${gif.title}"></a>`
        }).join('\n');

        return gifsCollectionHtml;
    }

    setSearcherRequestValue() {
        const searchTextField = document.getElementsByClassName('searcher__field')[0];

        searchTextField.value = Utils.getSearchRequestTextFromURL();
    }

    makeSearchBtnValid() {
        const searchBtn = document.getElementsByClassName('searcher__btn')[0];

        searchBtn.disabled = false;
    }

    validateShowMoreBtn() {
        const showMoreBtn = document.getElementsByClassName('collection__btn')[0];

        if (!showMoreBtn) return;

        showMoreBtn.disabled = this.gifsService.areGifsFinished();
    }
}