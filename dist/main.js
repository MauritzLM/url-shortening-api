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

    // check if input is invalid* (!validity.valid)
    if (!link.validity.valid) {
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
    }

});


const linksList = document.querySelector(".links-list");

linksList.addEventListener('click', (e) => {
    let element = e.target;
    if (element.matches(".copy")) {
        // get short link
        let linkToCopy = element.closest("div").firstChild.data;
        // copy link to clipboard
        navigator.clipboard.writeText(linkToCopy);
        // change text content of button to copied, all other buttons = copy*
        // loop over all copy buttons and change to copy;*
        // toggle style class*
        element.textContent = 'Copied!';

    }
})






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOURzQztBQUN0QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBYTtBQUNyQjtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNBO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSxJQUFJO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRLG9EQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS8uL3NyYy9mZXRjaC5qcyIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJsLXNob3J0ZW5pbmctYXBpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY3JlYXRlIHNob3J0ZW5lZCBsaW5rIHVpXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtEaXYobGluaywgc2hvcnQpIHtcclxuICAgIC8vIGNvbnRhaW5pbmcgZGl2XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIC8vIG9yaWdpbmFsIGxpbmtcclxuICAgIGNvbnN0IG9yaWduYUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIG9yaWduYUxpbmsudGV4dENvbnRlbnQgPSBsaW5rO1xyXG5cclxuICAgIC8vIHNob3J0IGxpbmsgZGl2XHJcbiAgICBjb25zdCBzaG9ydExpbmtEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBzaG9ydExpbmtEaXYudGV4dENvbnRlbnQgPSBzaG9ydDtcclxuXHJcbiAgICAvLyBzaG9ydCBsaW5rID9cclxuICAgIC8vIGNvbnN0IHNob3J0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgLy8gc2hvcnRMaW5rLnRleHRDb250ZW50ID0gc2hvcnQ7XHJcbiAgICAvLyBzaG9ydExpbmsuY2xhc3NMaXN0LmFkZChcInNob3J0XCIpO1xyXG5cclxuICAgIC8vIGJ1dHRvblxyXG4gICAgY29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjb3B5QnV0dG9uLnRleHRDb250ZW50ID0gXCJDb3B5XCI7XHJcbiAgICBjb3B5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjb3B5XCIpO1xyXG5cclxuICAgIHNob3J0TGlua0Rpdi5hcHBlbmQoY29weUJ1dHRvbik7XHJcbiAgICBkaXYuYXBwZW5kKG9yaWduYUxpbmssIHNob3J0TGlua0RpdilcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiB0byBkaXNwbGF5IHNob3J0ZW5lZCBsaW5rIHVzaW5nIGpzb25cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHQoanNvbikge1xyXG4gICAgY29uc29sZS5sb2coanNvbik7XHJcbiAgICAvLyBnZXQgb3JpZ2luYWwgbGlua1xyXG4gICAgbGV0IGxpbmsgPSBqc29uLnJlc3VsdC5vcmlnaW5hbF9saW5rO1xyXG4gICAgLy8gZ2V0IHNob3J0IGxpbmtcclxuICAgIGxldCBzaG9ydCA9IGpzb24ucmVzdWx0LmZ1bGxfc2hvcnRfbGluaztcclxuICAgIC8vIFxyXG4gICAgbGV0IGRpdiA9IGNyZWF0ZUxpbmtEaXYobGluaywgc2hvcnQpO1xyXG5cclxuICAgIGxldCBsaW5rc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlua3MtbGlzdFwiKTtcclxuXHJcbiAgICBsaW5rc0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xyXG59XHJcblxyXG4vLyBkaXNwbGF5IHN0b3JhZ2VcclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlTdG9yYWdlKGFycmF5KSB7XHJcbiAgICAvLyBsb29wIG92ZXIgYXJyYXlcclxuICAgIGFycmF5LmZvckVhY2gob2JqID0+IHtcclxuICAgICAgICBsZXQgbGluayA9IG9iai5yZXN1bHQub3JpZ2luYWxfbGluaztcclxuICAgICAgICAvLyBnZXQgc2hvcnQgbGlua1xyXG4gICAgICAgIGxldCBzaG9ydCA9IG9iai5yZXN1bHQuZnVsbF9zaG9ydF9saW5rO1xyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIGxldCBkaXYgPSBjcmVhdGVMaW5rRGl2KGxpbmssIHNob3J0KTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmtzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5rcy1saXN0XCIpO1xyXG5cclxuICAgICAgICBsaW5rc0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLy8gbW9iaWxlIG5hdmJhciIsImltcG9ydCB7IGRpc3BsYXlSZXN1bHQgfSBmcm9tIFwiLi9kb21cIjtcclxuLy8gbWFrZSBmZXRjaCByZXF1ZXN0IHRvIGdldCBzaG9ydGVuZWQgbGlua1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2hvcnRMaW5rKHJlcXVlc3QsIGFycmF5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBhcnJheS5wdXNoKGpzb24pO1xyXG4gICAgICAgIC8vIHN0b3JlIGFycmF5IG9mIHJldHVybmVkIG9iamVjdHMgaW4gbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpbmtzJywgSlNPTi5zdHJpbmdpZnkoYXJyYXkpKTtcclxuICAgICAgICBkaXNwbGF5UmVzdWx0KGpzb24pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgZGF0YTogJHtlcnJvci5tZXNzYWdlfWApXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRTaG9ydExpbmsgfSBmcm9tIFwiLi9mZXRjaFwiO1xyXG5pbXBvcnQgeyBkaXNwbGF5U3RvcmFnZSB9IGZyb20gXCIuL2RvbVwiO1xyXG5cclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xyXG5jb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1cmxcIik7XHJcblxyXG4vLyBhcnJheSB0byBzdG9yZSBsaW5rc1xyXG5sZXQgbGlua3NBcnJheTtcclxuLy8gZ2V0IGxvY2FsIHN0b3JhZ2UgaWYgaXQgZXhpc3RzXHJcbihmdW5jdGlvbiBnZXRTdG9yYWdlKCkge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaW5rcycpKSB7XHJcbiAgICAgICAgY29uc3QgbGlua3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaW5rcycpKVxyXG4gICAgICAgIGxpbmtzQXJyYXkgPSBbLi4ubGlua3NdO1xyXG4gICAgICAgIGRpc3BsYXlTdG9yYWdlKGxpbmtzQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxpbmtzQXJyYXkgPSBbXTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGV2ZW50IGxpc3RlbmVyIG9uIHN1Ym1pdCB0byBnZXQgdXJsIGFuZCBydW4gZ2V0U2hvcnRMaW5rXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBjaGVjayBpZiBpbnB1dCBpcyBpbnZhbGlkKiAoIXZhbGlkaXR5LnZhbGlkKVxyXG4gICAgaWYgKCFsaW5rLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gdXJsIHRvIHNob3J0ZW5cclxuICAgICAgICBsZXQgdXJsID0gbGluay52YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbXlSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnNocnRjby5kZS92Mi9zaG9ydGVuP3VybD0ke3VybH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgICAgY2FjaGU6ICdkZWZhdWx0JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZmV0Y2ggc2hvcnQgbGlua1xyXG4gICAgICAgIGdldFNob3J0TGluayhteVJlcXVlc3QsIGxpbmtzQXJyYXkpO1xyXG5cclxuICAgICAgICAvLyByZXNldCB0ZXh0IGZpZWxkXHJcbiAgICAgICAgbGluay52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuY29uc3QgbGlua3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5rcy1saXN0XCIpO1xyXG5cclxubGlua3NMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAoZWxlbWVudC5tYXRjaGVzKFwiLmNvcHlcIikpIHtcclxuICAgICAgICAvLyBnZXQgc2hvcnQgbGlua1xyXG4gICAgICAgIGxldCBsaW5rVG9Db3B5ID0gZWxlbWVudC5jbG9zZXN0KFwiZGl2XCIpLmZpcnN0Q2hpbGQuZGF0YTtcclxuICAgICAgICAvLyBjb3B5IGxpbmsgdG8gY2xpcGJvYXJkXHJcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQobGlua1RvQ29weSk7XHJcbiAgICAgICAgLy8gY2hhbmdlIHRleHQgY29udGVudCBvZiBidXR0b24gdG8gY29waWVkLCBhbGwgb3RoZXIgYnV0dG9ucyA9IGNvcHkqXHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBjb3B5IGJ1dHRvbnMgYW5kIGNoYW5nZSB0byBjb3B5OypcclxuICAgICAgICAvLyB0b2dnbGUgc3R5bGUgY2xhc3MqXHJcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdDb3BpZWQhJztcclxuXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9