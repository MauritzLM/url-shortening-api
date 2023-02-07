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
        (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.getShortLink)(myRequest, linksArray);

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
            btn.textContent = "copy";
        });

        // toggle style class and text content;
        element.textContent = 'Copied!';
        element.classList.add("copied");

    }
})






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1RHNDO0FBQ3RDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFhO0FBQ3JCO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDakJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ0E7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLElBQUk7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsb0RBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS8uL3NyYy9mZXRjaC5qcyIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJsLXNob3J0ZW5pbmctYXBpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY3JlYXRlIHNob3J0ZW5lZCBsaW5rIHVpXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtEaXYobGluaywgc2hvcnQpIHtcclxuICAgIC8vIGNvbnRhaW5pbmcgZGl2XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIC8vIG9yaWdpbmFsIGxpbmtcclxuICAgIGNvbnN0IG9yaWduYUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIG9yaWduYUxpbmsudGV4dENvbnRlbnQgPSBsaW5rO1xyXG5cclxuICAgIC8vIHNob3J0IGxpbmsgZGl2XHJcbiAgICBjb25zdCBzaG9ydExpbmtEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBzaG9ydExpbmtEaXYudGV4dENvbnRlbnQgPSBzaG9ydDtcclxuXHJcbiAgICAvLyBzaG9ydCBsaW5rID9cclxuICAgIC8vIGNvbnN0IHNob3J0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgLy8gc2hvcnRMaW5rLnRleHRDb250ZW50ID0gc2hvcnQ7XHJcbiAgICAvLyBzaG9ydExpbmsuY2xhc3NMaXN0LmFkZChcInNob3J0XCIpO1xyXG5cclxuICAgIC8vIGJ1dHRvblxyXG4gICAgY29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjb3B5QnV0dG9uLnRleHRDb250ZW50ID0gXCJDb3B5XCI7XHJcbiAgICBjb3B5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjb3B5XCIpO1xyXG5cclxuICAgIHNob3J0TGlua0Rpdi5hcHBlbmQoY29weUJ1dHRvbik7XHJcbiAgICBkaXYuYXBwZW5kKG9yaWduYUxpbmssIHNob3J0TGlua0RpdilcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiB0byBkaXNwbGF5IHNob3J0ZW5lZCBsaW5rIHVzaW5nIGpzb25cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHQoanNvbikge1xyXG4gICAgY29uc29sZS5sb2coanNvbik7XHJcbiAgICAvLyBnZXQgb3JpZ2luYWwgbGlua1xyXG4gICAgbGV0IGxpbmsgPSBqc29uLnJlc3VsdC5vcmlnaW5hbF9saW5rO1xyXG4gICAgLy8gZ2V0IHNob3J0IGxpbmtcclxuICAgIGxldCBzaG9ydCA9IGpzb24ucmVzdWx0LmZ1bGxfc2hvcnRfbGluaztcclxuICAgIC8vIFxyXG4gICAgbGV0IGRpdiA9IGNyZWF0ZUxpbmtEaXYobGluaywgc2hvcnQpO1xyXG5cclxuICAgIGxldCBsaW5rc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlua3MtbGlzdFwiKTtcclxuXHJcbiAgICBsaW5rc0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xyXG59XHJcblxyXG4vLyBkaXNwbGF5IHN0b3JhZ2VcclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlTdG9yYWdlKGFycmF5KSB7XHJcbiAgICAvLyBsb29wIG92ZXIgYXJyYXlcclxuICAgIGFycmF5LmZvckVhY2gob2JqID0+IHtcclxuICAgICAgICBsZXQgbGluayA9IG9iai5yZXN1bHQub3JpZ2luYWxfbGluaztcclxuICAgICAgICAvLyBnZXQgc2hvcnQgbGlua1xyXG4gICAgICAgIGxldCBzaG9ydCA9IG9iai5yZXN1bHQuZnVsbF9zaG9ydF9saW5rO1xyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIGxldCBkaXYgPSBjcmVhdGVMaW5rRGl2KGxpbmssIHNob3J0KTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmtzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5rcy1saXN0XCIpO1xyXG5cclxuICAgICAgICBsaW5rc0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIG1vYmlsZSBuYXZiYXIiLCJpbXBvcnQgeyBkaXNwbGF5UmVzdWx0IH0gZnJvbSBcIi4vZG9tXCI7XHJcbi8vIG1ha2UgZmV0Y2ggcmVxdWVzdCB0byBnZXQgc2hvcnRlbmVkIGxpbmtcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNob3J0TGluayhyZXF1ZXN0LCBhcnJheSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgYXJyYXkucHVzaChqc29uKTtcclxuICAgICAgICAvLyBzdG9yZSBhcnJheSBvZiByZXR1cm5lZCBvYmplY3RzIGluIGxvY2FsU3RvcmFnZVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaW5rcycsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcbiAgICAgICAgZGlzcGxheVJlc3VsdChqc29uKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIGRhdGE6ICR7ZXJyb3IubWVzc2FnZX1gKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0U2hvcnRMaW5rIH0gZnJvbSBcIi4vZmV0Y2hcIjtcclxuaW1wb3J0IHsgZGlzcGxheVN0b3JhZ2UgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcclxuY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXJsXCIpO1xyXG5jb25zdCBlcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3JcIik7XHJcblxyXG4vLyBhcnJheSB0byBzdG9yZSBsaW5rc1xyXG5sZXQgbGlua3NBcnJheTtcclxuLy8gZ2V0IGxvY2FsIHN0b3JhZ2UgaWYgaXQgZXhpc3RzXHJcbihmdW5jdGlvbiBnZXRTdG9yYWdlKCkge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaW5rcycpKSB7XHJcbiAgICAgICAgY29uc3QgbGlua3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaW5rcycpKVxyXG4gICAgICAgIGxpbmtzQXJyYXkgPSBbLi4ubGlua3NdO1xyXG4gICAgICAgIGRpc3BsYXlTdG9yYWdlKGxpbmtzQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxpbmtzQXJyYXkgPSBbXTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGV2ZW50IGxpc3RlbmVyIG9uIHN1Ym1pdCB0byBnZXQgdXJsIGFuZCBydW4gZ2V0U2hvcnRMaW5rXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBjaGVjayBpZiBpbnB1dCBpcyB2YWxpZFxyXG4gICAgaWYgKCFsaW5rLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgICAgLy8gZGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgZXJyb3Iuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAvLyByZWQgb3V0bGluZVxyXG4gICAgICAgIGxpbmsuc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgaHNsKDAsIDg3JSwgNjclKVwiO1xyXG5cclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyB1cmwgdG8gc2hvcnRlblxyXG4gICAgICAgIGxldCB1cmwgPSBsaW5rLnZhbHVlO1xyXG5cclxuICAgICAgICBjb25zdCBteVJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkuc2hydGNvLmRlL3YyL3Nob3J0ZW4/dXJsPSR7dXJsfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgICAgICBjYWNoZTogJ2RlZmF1bHQnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBmZXRjaCBzaG9ydCBsaW5rXHJcbiAgICAgICAgZ2V0U2hvcnRMaW5rKG15UmVxdWVzdCwgbGlua3NBcnJheSk7XHJcblxyXG4gICAgICAgIC8vIHJlc2V0IHRleHQgZmllbGRcclxuICAgICAgICBsaW5rLnZhbHVlID0gJyc7XHJcbiAgICAgICAgZXJyb3Iuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5jb25zdCBsaW5rc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpbmtzLWxpc3RcIik7XHJcblxyXG4vLyBldmVudCB0byBjb3B5IGxpbmsgdG8gY2xpcGJvYXJkXHJcbmxpbmtzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xyXG4gICAgaWYgKGVsZW1lbnQubWF0Y2hlcyhcIi5jb3B5XCIpKSB7XHJcbiAgICAgICAgLy8gZ2V0IHNob3J0IGxpbmtcclxuICAgICAgICBsZXQgbGlua1RvQ29weSA9IGVsZW1lbnQuY2xvc2VzdChcImRpdlwiKS5maXJzdENoaWxkLmRhdGE7XHJcbiAgICAgICAgLy8gY29weSBsaW5rIHRvIGNsaXBib2FyZFxyXG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGxpbmtUb0NvcHkpO1xyXG4gICAgICAgIC8vIGdldCBjb3B5IGJ1dHRvbnNcclxuICAgICAgICBsZXQgY29weUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvcHlcIik7XHJcbiAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCBjb3B5IGJ1dHRvbnMgYW5kIGNoYW5nZSB0byBjb3B5O1xyXG4gICAgICAgIGNvcHlCdXR0b25zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTmFtZSA9IFwiY29weVwiO1xyXG4gICAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBcImNvcHlcIjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdG9nZ2xlIHN0eWxlIGNsYXNzIGFuZCB0ZXh0IGNvbnRlbnQ7XHJcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdDb3BpZWQhJztcclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb3BpZWRcIik7XHJcblxyXG4gICAgfVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==