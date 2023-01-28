import { getShortLink } from "./fetch";

const form = document.querySelector("form");
const link = document.querySelector("#url");

// event listener on submit to get url and run getShortLink

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // url to shorten
    let url = link.value;

    const myRequest = new Request(`https://api.shrtco.de/v2/shorten?url=${url}`, {
        method: 'GET',
        headers: {
            accept: "application/json",
        },
        mode: 'cors',
        cache: 'default',
    });

    // fetch short link
    getShortLink(myRequest);

    // reset text field
    link.value = '';
})





