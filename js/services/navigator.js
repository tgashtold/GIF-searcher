class PagesNavigator{
    static redirectToSearchResultPage(inputValue) {
        location.hash = `#${Routes.searchResults.url}${inputValue}`;
    }
}