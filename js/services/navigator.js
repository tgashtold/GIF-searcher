class PagesNavigator {
    static redirectToSearchResultPage(inputValue) {
        location.hash = `#${Routes.searchResults.url}${inputValue}`;
    }

    static redirectToPreviousPage() {
        history.back();
    }

    static redirectToErrorPage() {
        location.hash = '#/error';
    }
}