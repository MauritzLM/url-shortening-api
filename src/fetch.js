import { displayResult } from "./dom";
// make fetch request to get shortened link
export async function getShortLink(request, array) {
    try {
        const response = await fetch(request);
        const json = await response.json();
        array.push(json);
        // store array of returned objects in localStorage
        localStorage.setItem('links', JSON.stringify(array));
        displayResult(json);
    }
    catch (error) {
        console.error(`Error fetching data: ${error.message}`)
    }

}


