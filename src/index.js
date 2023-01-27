import { getShortLink } from "./fetch";

// get url from input when button is clicked*
const link = document.querySelector("#url");

// test url
let url = 'https://howlongtobeat.com/game/97298om/';

const myRequest = new Request(`https://api.shrtco.de/v2/shorten?url=${url}`, {
    method: 'GET',
    headers: {
        accept: "application/json",
    },
    mode: 'cors',
    cache: 'default',
});

getShortLink(myRequest);

