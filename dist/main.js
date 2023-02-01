/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayResult": () => (/* binding */ displayResult),
/* harmony export */   "displayStorage": () => (/* binding */ displayStorage)
/* harmony export */ });
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

    // short link ?
    // const shortLink = document.createElement("p");
    // shortLink.textContent = short;
    // shortLink.classList.add("short");

    // button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.classList.add("copy");

    shortLinkDiv.append(copyButton);
    div.append(orignaLink, shortLinkDiv)

    return div;
}

// function to display shortened link using json
function displayResult(json) {
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

// display storage
function displayStorage(array) {
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
}

// mobile navbar

/***/ }),

/***/ "./src/fetch.js":
/*!**********************!*\
  !*** ./src/fetch.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getShortLink": () => (/* binding */ getShortLink)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");

// make fetch request to get shortened link
async function getShortLink(request, array) {
    try {
        const response = await fetch(request);
        const json = await response.json();
        array.push(json);
        // store array of returned objects in localStorage
        localStorage.setItem('links', JSON.stringify(array));
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayResult)(json);
    }
    catch (error) {
        console.error(`Error fetching data: ${error.message}`)
    }

}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./src/fetch.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



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
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayStorage)(linksArray);
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
        error.style.visibility = "visible";
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
        (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.getShortLink)(myRequest, linksArray);

        // reset text field
        link.value = '';
        error.style.visibility = "collapse";
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
        copyButtons.forEach(btn => {
            btn.className = "copy";
            btn.textContent = "copy";
        })
        // change text content of button to copied, all other buttons = copy*
        // loop over all copy buttons and change to copy;*
        // toggle style class*
        element.textContent = 'Copied!';
        element.classList.add("copied");

    }
})






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1RHNDO0FBQ3RDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFhO0FBQ3JCO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDakJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ0E7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLElBQUk7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsb0RBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdXJsLXNob3J0ZW5pbmctYXBpLy4vc3JjL2ZldGNoLmpzIiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjcmVhdGUgc2hvcnRlbmVkIGxpbmsgdWlcclxuZnVuY3Rpb24gY3JlYXRlTGlua0RpdihsaW5rLCBzaG9ydCkge1xyXG4gICAgLy8gY29udGFpbmluZyBkaXZcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgLy8gb3JpZ2luYWwgbGlua1xyXG4gICAgY29uc3Qgb3JpZ25hTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgb3JpZ25hTGluay50ZXh0Q29udGVudCA9IGxpbms7XHJcblxyXG4gICAgLy8gc2hvcnQgbGluayBkaXZcclxuICAgIGNvbnN0IHNob3J0TGlua0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIHNob3J0TGlua0Rpdi50ZXh0Q29udGVudCA9IHNob3J0O1xyXG5cclxuICAgIC8vIHNob3J0IGxpbmsgP1xyXG4gICAgLy8gY29uc3Qgc2hvcnRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAvLyBzaG9ydExpbmsudGV4dENvbnRlbnQgPSBzaG9ydDtcclxuICAgIC8vIHNob3J0TGluay5jbGFzc0xpc3QuYWRkKFwic2hvcnRcIik7XHJcblxyXG4gICAgLy8gYnV0dG9uXHJcbiAgICBjb25zdCBjb3B5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNvcHlCdXR0b24udGV4dENvbnRlbnQgPSBcIkNvcHlcIjtcclxuICAgIGNvcHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImNvcHlcIik7XHJcblxyXG4gICAgc2hvcnRMaW5rRGl2LmFwcGVuZChjb3B5QnV0dG9uKTtcclxuICAgIGRpdi5hcHBlbmQob3JpZ25hTGluaywgc2hvcnRMaW5rRGl2KVxyXG5cclxuICAgIHJldHVybiBkaXY7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIHRvIGRpc3BsYXkgc2hvcnRlbmVkIGxpbmsgdXNpbmcganNvblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVJlc3VsdChqc29uKSB7XHJcbiAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgIC8vIGdldCBvcmlnaW5hbCBsaW5rXHJcbiAgICBsZXQgbGluayA9IGpzb24ucmVzdWx0Lm9yaWdpbmFsX2xpbms7XHJcbiAgICAvLyBnZXQgc2hvcnQgbGlua1xyXG4gICAgbGV0IHNob3J0ID0ganNvbi5yZXN1bHQuZnVsbF9zaG9ydF9saW5rO1xyXG4gICAgLy8gXHJcbiAgICBsZXQgZGl2ID0gY3JlYXRlTGlua0RpdihsaW5rLCBzaG9ydCk7XHJcblxyXG4gICAgbGV0IGxpbmtzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5rcy1saXN0XCIpO1xyXG5cclxuICAgIGxpbmtzRGl2LmFwcGVuZENoaWxkKGRpdik7XHJcbn1cclxuXHJcbi8vIGRpc3BsYXkgc3RvcmFnZVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVN0b3JhZ2UoYXJyYXkpIHtcclxuICAgIC8vIGxvb3Agb3ZlciBhcnJheVxyXG4gICAgYXJyYXkuZm9yRWFjaChvYmogPT4ge1xyXG4gICAgICAgIGxldCBsaW5rID0gb2JqLnJlc3VsdC5vcmlnaW5hbF9saW5rO1xyXG4gICAgICAgIC8vIGdldCBzaG9ydCBsaW5rXHJcbiAgICAgICAgbGV0IHNob3J0ID0gb2JqLnJlc3VsdC5mdWxsX3Nob3J0X2xpbms7XHJcbiAgICAgICAgLy8gXHJcbiAgICAgICAgbGV0IGRpdiA9IGNyZWF0ZUxpbmtEaXYobGluaywgc2hvcnQpO1xyXG5cclxuICAgICAgICBsZXQgbGlua3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpbmtzLWxpc3RcIik7XHJcblxyXG4gICAgICAgIGxpbmtzRGl2LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gbW9iaWxlIG5hdmJhciIsImltcG9ydCB7IGRpc3BsYXlSZXN1bHQgfSBmcm9tIFwiLi9kb21cIjtcclxuLy8gbWFrZSBmZXRjaCByZXF1ZXN0IHRvIGdldCBzaG9ydGVuZWQgbGlua1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvcnRMaW5rKHJlcXVlc3QsIGFycmF5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBhcnJheS5wdXNoKGpzb24pO1xyXG4gICAgICAgIC8vIHN0b3JlIGFycmF5IG9mIHJldHVybmVkIG9iamVjdHMgaW4gbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpbmtzJywgSlNPTi5zdHJpbmdpZnkoYXJyYXkpKTtcclxuICAgICAgICBkaXNwbGF5UmVzdWx0KGpzb24pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgZGF0YTogJHtlcnJvci5tZXNzYWdlfWApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRTaG9ydExpbmsgfSBmcm9tIFwiLi9mZXRjaFwiO1xyXG5pbXBvcnQgeyBkaXNwbGF5U3RvcmFnZSB9IGZyb20gXCIuL2RvbVwiO1xyXG5cclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xyXG5jb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1cmxcIik7XHJcbmNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvclwiKTtcclxuXHJcbi8vIGFycmF5IHRvIHN0b3JlIGxpbmtzXHJcbmxldCBsaW5rc0FycmF5O1xyXG4vLyBnZXQgbG9jYWwgc3RvcmFnZSBpZiBpdCBleGlzdHNcclxuKGZ1bmN0aW9uIGdldFN0b3JhZ2UoKSB7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpbmtzJykpIHtcclxuICAgICAgICBjb25zdCBsaW5rcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpbmtzJykpXHJcbiAgICAgICAgbGlua3NBcnJheSA9IFsuLi5saW5rc107XHJcbiAgICAgICAgZGlzcGxheVN0b3JhZ2UobGlua3NBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbGlua3NBcnJheSA9IFtdO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gZXZlbnQgbGlzdGVuZXIgb24gc3VibWl0IHRvIGdldCB1cmwgYW5kIHJ1biBnZXRTaG9ydExpbmtcclxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIGNoZWNrIGlmIGlucHV0IGlzIHZhbGlkXHJcbiAgICBpZiAoIWxpbmsudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgICAvLyBkaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgICBlcnJvci5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gdXJsIHRvIHNob3J0ZW5cclxuICAgICAgICBsZXQgdXJsID0gbGluay52YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbXlSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnNocnRjby5kZS92Mi9zaG9ydGVuP3VybD0ke3VybH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgICAgY2FjaGU6ICdkZWZhdWx0JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZmV0Y2ggc2hvcnQgbGlua1xyXG4gICAgICAgIGdldFNob3J0TGluayhteVJlcXVlc3QsIGxpbmtzQXJyYXkpO1xyXG5cclxuICAgICAgICAvLyByZXNldCB0ZXh0IGZpZWxkXHJcbiAgICAgICAgbGluay52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGVycm9yLnN0eWxlLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbmNvbnN0IGxpbmtzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlua3MtbGlzdFwiKTtcclxuXHJcbi8vIGV2ZW50IHRvIGNvcHkgbGluayB0byBjbGlwYm9hcmRcclxubGlua3NMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAoZWxlbWVudC5tYXRjaGVzKFwiLmNvcHlcIikpIHtcclxuICAgICAgICAvLyBnZXQgc2hvcnQgbGlua1xyXG4gICAgICAgIGxldCBsaW5rVG9Db3B5ID0gZWxlbWVudC5jbG9zZXN0KFwiZGl2XCIpLmZpcnN0Q2hpbGQuZGF0YTtcclxuICAgICAgICAvLyBjb3B5IGxpbmsgdG8gY2xpcGJvYXJkXHJcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQobGlua1RvQ29weSk7XHJcbiAgICAgICAgLy8gZ2V0IGNvcHkgYnV0dG9uc1xyXG4gICAgICAgIGxldCBjb3B5QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29weVwiKTtcclxuICAgICAgICBjb3B5QnV0dG9ucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc05hbWUgPSBcImNvcHlcIjtcclxuICAgICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gXCJjb3B5XCI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBjaGFuZ2UgdGV4dCBjb250ZW50IG9mIGJ1dHRvbiB0byBjb3BpZWQsIGFsbCBvdGhlciBidXR0b25zID0gY29weSpcclxuICAgICAgICAvLyBsb29wIG92ZXIgYWxsIGNvcHkgYnV0dG9ucyBhbmQgY2hhbmdlIHRvIGNvcHk7KlxyXG4gICAgICAgIC8vIHRvZ2dsZSBzdHlsZSBjbGFzcypcclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0NvcGllZCEnO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvcGllZFwiKTtcclxuXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9