function router() {
    const contentContainer = document.getElementsByClassName('main')[0];
    const page = ViewSelector.getPageToRender();

    page.getData()
        .then(data => {
            page.render(data)
                .then(html => {
                    contentContainer.innerHTML = html;

                    page.afterRender();
                });
        })
        .catch(() => PagesNavigator.redirectToErrorPage());
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);