class GifDetails extends Component {
    gif;
    gifsService = new GifsService();

    getData() {
        return this.gifsService.getGifToRender();
           }

    render(gifDataToRender) {
        return new Promise(resolve => {
            let html;
            this.gif = gifDataToRender.gif;
            const link = gifDataToRender.linkBack;
          
            if (this._isAvailable()) {
                html = ` 
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
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }

    afterRender() {
        if (this._isAvailable()) {
            this.setActions();
        }
    }

    setActions() {
        const backBtn = document.getElementsByClassName('gif-info__btn')[0];

        backBtn.addEventListener('click', () => {
            if (!backBtn.getAttribute('href')) {
                event.preventDefault();

                history.back();
            }
        });
    }
    
    _isAvailable() {
        return !!Object.keys(this.gif).length;
    }
}