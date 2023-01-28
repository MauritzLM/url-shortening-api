// create shortened link ui
function createLinkDiv(link, short) {
    // containing div
    const div = document.createElement("div");

    // original link
    const orignaLink = document.createElement("p");
    orignaLink.textContent = link;

    // short link div
    const shortLinkDiv = document.createElement("div")
    // short link 
    const shortLink = document.createElement("p");
    shortLink.textContent = short;

    // button
    const copyButton = document.createElement("button");
    copyButton.textContent = "copy";
    copyButton.classList.add("copy");

    shortLinkDiv.append(shortLink, copyButton);
    div.append(orignaLink, shortLinkDiv)

    return div;
}

// function to display shortened link using json
export function displayResult(json) {
    console.log(json);
    // get original link
    let link = json.result.original_link;
    // get short link
    let short = json.result.full_short_link;
    // 
    let div = createLinkDiv(link, short);

    let linksDiv = document.querySelector(".links-list");

    linksDiv.appendChild(div);
}

// mobile navbar