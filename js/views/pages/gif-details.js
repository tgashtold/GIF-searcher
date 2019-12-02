class GifDetails extends Component {
    gif;
    gifsService = new GifsService();

    getData() {
        return this.gifsService.getGif(Utils.parseRequestURL().id);
    }

    render(gifDataToRender) {
        return new Promise(resolve => {
            this.gif = gifDataToRender.gif;
            const link = gifDataToRender.linkBack;

            const html = ` 
                    <div class="gif-info">
                        <h1 class = "gif__title">${this.gif.title.toUpperCase()}</h1>
                        <img class="gif" src="${this.gif.urlForOriginalSize}" alt="GIF">
                        <div class="gif__details-wrapper">
                        <div class="gif__details">
                            <span class="gif__details-title">Creation date:</span>
                            <span class="gif__details-value">${this.gif.creationDate}</span>
                        </div>
                        <div class="gif__details">
                            <span class="gif__details-title">Author: </span>
                            <span class="gif__details-value">${this.gif.author || 'no data'}</span>
                        </div>
                        </div>
                        <a href ="${link || ''}" class = "gif-info__btn button">Back</a>
                    </div>`;

            resolve(html);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const backBtn = document.getElementsByClassName('gif-info__btn')[0];

        backBtn.addEventListener('click', () => {
            if (!backBtn.getAttribute('href')) {
                event.preventDefault();

                PagesNavigator.redirectToPreviousPage();
            }
        });
    }
}