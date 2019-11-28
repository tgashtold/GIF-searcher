class Gifs {
	async getGifs(gifsQuantity, searchStartNumber) {
		let searchText = Utils.parseRequestURL().resource.replace('search?q=', '');
		const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=RO1EUEkYWvD5a1TM08F8iztvm1pprCHT&q=${searchText}&limit=${gifsQuantity}&offset=${searchStartNumber}&rating=G&lang=en`);
		
		return await response.json();
	}

	async getGif() {
		let gifId = Utils.parseRequestURL().id;
		const response = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=RO1EUEkYWvD5a1TM08F8iztvm1pprCHT`);

		return await response.json();
	}
}