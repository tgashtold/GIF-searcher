class GifDetails extends Component {
  constructor() {
    super();
    this.model = new Gifs();
    this.gif;
  }

  getData() {
    return new Promise(resolve => {
      const gifId = Utils.parseRequestURL().id;
      this.gif = cache.getGifFromCache(gifId);

      if (this.gif) {
        console.log('cache');

        // resolve([this.gif]);
        
        resolve(this.gif);
      } else {
        console.log('request');

        this.model.getGif()
          .then(gifObj => {
            const gifData = this.filterServerResponse(gifObj);
            this.gif = gifData;
            // const linkBack = '#/';

            // resolve([this.gif, linkBack]);
            resolve(this.gif);
          })
          .catch(() => {
            this.gif = {};

            resolve(this.gif);
          });
      }
    });
  }

  render(gif) {
    return new Promise(resolve => {
      let html;
      // const gif = data[0];
      // const link = data[1];

      if (this.isAvailable()) {
        html = ` 
          <div class="gif-info">
            <h1 class = "gif__title">${gif.title.toUpperCase()}</h1>
            <img class="gif" src="${gif.urlForOriginalSize}" alt="GIF">
            <div class="gif__details-wrapper">
              <div class="gif__details">
                <span class="gif__details-title">Creation date:</span>
                <span class="gif__details-value">${gif.creationDate}</span>
              </div>
              <div class="gif__details">
                <span class="gif__details-title">Author: </span>
                <span class="gif__details-value">${gif.author}</span>
              </div>
            </div>
          
            <button class = "gif-info__btn">Back</button>
          </div>`;
      } else {
        html = new Error404().render();
      }

      resolve(html);
    });
  }

  afterRender() {
    if (this.isAvailable()) {
      this.setActions();
    }
  }

  isAvailable() {
    return !!Object.keys(this.gif).length;
  }

  setActions() {
    const backBtn = document.getElementsByClassName('gif-info__btn')[0];

    backBtn.addEventListener('click', () => {
      // if (!backBtn.getAttribute('href')) {
        // event.preventDefault();
        if (document.referrer.length>0) {
          history.back();
        } else {
          location.hash = '#/';
        }
      // }
    });
  }

  filterServerResponse(response) {
    const gifInfo = response.data;
    const filteredResponse = {
      id: gifInfo.id,
      author: gifInfo.username || 'no data',
      title: gifInfo.title,
      creationDate: gifInfo.import_datetime,
      urlForOriginalSize: gifInfo.images.original.url,
    };

    return filteredResponse;
  }
}