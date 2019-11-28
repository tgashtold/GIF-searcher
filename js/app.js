const Routes = {
    '/': MainPage,
    '/search': SearchResults,
    '/gif/id': GifDetails,
};

function router() {
    const contentContainer = document.getElementsByClassName('main')[0];
    const request = Utils.parseRequestURL();
    const requestResource = request.resource.startsWith('search') 
        ? 'search' 
        : (request.resource === 'gif') 
        ? 'gif'
        : '';
    const parsedURL = `/${requestResource}${request.id ? '/id' : ''}`;
    const page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData()
        .then(data => {
            page.render(data)
                .then(html => {
                    contentContainer.innerHTML = html;
                    page.afterRender();
                });
        });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);