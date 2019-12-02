class Utils {
    static searchPageHashStart = 'search?q=';
    static gifDetailsPageHashStart = 'gif';
    static gifDetailsPageHashEnd = '/id';
    static errorPageHashStart = 'error';

    static parseRequestURL() {
        const url = location.hash.slice(2);
        const request = {};

        [request.resource, request.id] = url.split('/');

        return request;
    }

    static getSearchRequestTextFromURL() {
        const searchText = this.parseRequestURL().resource.replace(this.searchPageHashStart, '').replace(/%20/g, ' ');

        return searchText;
    }

    static getParsedLocationHash() {
        const request = this.parseRequestURL();
        const requestResource = request.resource.startsWith(this.searchPageHashStart) 
            ? this.searchPageHashStart
            : (request.resource === this.gifDetailsPageHashStart) 
                ? this.gifDetailsPageHashStart 
                : (request.resource === this.errorPageHashStart)
                    ? this.errorPageHashStart
                    :'';

        return `/${requestResource}${request.id ? this.gifDetailsPageHashEnd : ''}`;
    }
}