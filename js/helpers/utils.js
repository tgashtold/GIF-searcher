class Utils {
    static parseRequestURL() {
        const url = location.hash.slice(2);
        const request = {};

        [request.resource, request.id] = url.split('/');

        return request;
    }
}