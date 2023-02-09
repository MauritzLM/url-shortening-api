import { getShortLink } from "./fetch";
import { displayStorage } from "./dom";

const form = document.querySelector("form");
const link = document.querySelector("#url");
const error = document.querySelector(".error");

// array to store links
let linksArray;
// get local storage if it exists
(function getStorage() {
    if (localStorage.getItem('links')) {
        const links = JSON.parse(localStorage.getItem('links'))
        linksArray = [...links];
        displayStorage(linksArray);
    }

    else {
        linksArray = [];
    }
})();

// event listener on submit to get url and run getShortLink
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // check if input is valid
    if (!link.validity.valid) {
        // display error message
        error.style.display = "block";
        // red outline
        link.style.border = "2px solid hsl(0, 87%, 67%)";

        return
    }

    else {
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
        getShortLink(myRequest, linksArray);

        // reset text field
        link.value = '';
        error.style.display = "none";
    }

});

const linksList = document.querySelector(".links-list");

// event to copy link to clipboard
linksList.addEventListener('click', (e) => {
    let element = e.target;
    if (element.matches(".copy")) {
        // get short link
        let linkToCopy = element.closest("div").firstChild.data;
        // copy link to clipboard
        navigator.clipboard.writeText(linkToCopy);
        // get copy buttons
        let copyButtons = document.querySelectorAll(".copy");
        // loop over all copy buttons and change to copy;
        copyButtons.forEach(btn => {
            btn.className = "copy";
            btn.textContent = "Copy";
        });

        // toggle style class and text content;
        element.textContent = 'Copied!';
        element.classList.add("copied");

    }
})





