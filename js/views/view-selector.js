class ViewSelector {
    static getPageToRender() {
        const parsedHash = Utils.getParsedLocationHash();
        let page;

        for (let key in Routes) {
            const pageObj = Routes[key];

            if (pageObj.url == parsedHash) {
                page = new pageObj.component();
            }
        }

        return page || new Error404();
    }
}
