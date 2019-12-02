const Routes = {
    mainPage: {
        url: '/',
        component: MainPage,
    },
    searchResults: {
        url: '/search?q=',
        component: SearchResults,
    },
    gifDetails: {
        url: '/gif/id',
        component: GifDetails,
    },
    errorPage: {
        url: '/error',
        component: Error404,
    },
};