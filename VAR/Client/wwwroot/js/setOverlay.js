const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

let css = `#loading-section {   
                background-color: ${darkMode ? '#404040' : 'white'};
                color: ${darkMode ? 'white' : 'black'} }
            #loading-section h2 {
                color: ${darkMode ? 'white' : '#776be7ff'} }
            .loader-dot {
                background-color: ${darkMode ? 'white' : '#776be7ff'} }`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style)
style.type = 'text/css'

if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css
} else {
    style.appendChild(document.createTextNode(css))
}

(function () {
    let total = 0;
    let loaded = 0;

    let standardFetch = fetch;
    fetch = function (url, options) {
        total++;
        var promise = standardFetch(url, options);
        promise.then((data) => {
            let element = document.getElementById("loadingText");
            if (typeof (element) != 'undefined' && element != null) {
                loaded++;
                let progress = Math.floor(((loaded / total) * 100));
                let url = new URL(data.url);
                element.innerHTML = progress + "% - <i>loaded " + url.pathname + "</i>";
            }
        });
        return promise;
    }
})();