class Utils {
    static parseRequestURL() {
        const url = location.hash.slice(2);
        const request = {};

        [request.resource, request.id] = url.split('/');

        return request;
    }

    static getSearchRequestTextFromURL() {
        const searchText = this.parseRequestURL().resource.replace('search?q=', '').replace(/%20/g, ' ');

        return searchText;
    }

    static getParsedLocationHash() {
        const request = this.parseRequestURL();
        const requestResource = request.resource.startsWith('search?q=') 
            ? 'search?q=' 
            : (request.resource === 'gif') 
                ? 'gif' 
                :'';

        return `/${requestResource}${request.id ? '/id' : ''}`;
    }
}