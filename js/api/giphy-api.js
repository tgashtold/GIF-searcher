class GiphyApi {
    async getGifsData(searchText, gifsQuantity, searchStartNumber) {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=RO1EUEkYWvD5a1TM08F8iztvm1pprCHT&q=${searchText}&limit=${gifsQuantity}&offset=${searchStartNumber}&rating=G&lang=en`);
        const parsedResponse = await response.json();

        return {
            gifsData: parsedResponse.data.map(this.mapGif),
            gifsTotalQnty: parsedResponse.pagination.total_count,
        };
    }

    async getGif(gifId) {
        const response = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=RO1EUEkYWvD5a1TM08F8iztvm1pprCHT`);
        const gifInfo = await response.json();

        return this.mapGif(gifInfo.data);
    }

    mapGif(gifInfo) {
        const gif = new Gif();

        gif.id = gifInfo.id;
        gif.author = gifInfo.username;
        gif.title = gifInfo.title;
        gif.creationDate = gifInfo.import_datetime;
        gif.urlForOriginalSize = gifInfo.images.original.url;
        gif.urlForPreview = gifInfo.images.preview_gif.url;

        return gif;
    }
}