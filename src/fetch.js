
// make fetch request to get shortened link
export function getShortLink(request) {
    fetch(request)
        .then((response) => response.json())
        // display results using json data*
        .then((json) => console.log(json))
        .catch((error) => console.error(`Error fetching data: ${error.message}`));
}

