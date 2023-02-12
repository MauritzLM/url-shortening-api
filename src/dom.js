// create shortened link ui
function createLinkDiv(link, short) {
    // containing div
    const div = document.createElement("div");

    // original link
    const orignaLink = document.createElement("p");
    orignaLink.textContent = link;

    // short link div
    const shortLinkDiv = document.createElement("div")
    shortLinkDiv.textContent = short;

    // copy button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.classList.add("copy");

    shortLinkDiv.append(copyButton);
    div.append(orignaLink, shortLinkDiv)

    return div;
};

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
};

// display storage
export function displayStorage(array) {
    // loop over array
    array.forEach(obj => {
        let link = obj.result.original_link;
        // get short link
        let short = obj.result.full_short_link;
        // 
        let div = createLinkDiv(link, short);

        let linksDiv = document.querySelector(".links-list");

        linksDiv.appendChild(div);
    });
};
