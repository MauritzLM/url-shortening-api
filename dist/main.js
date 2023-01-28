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
/* harmony export */   "displayResult": () => (/* binding */ displayResult)
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
function getShortLink(request) {
    fetch(request)
        .then((response) => response.json())
        // display results using json data
        .then((json) => (0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayResult)(json))
        .catch((error) => console.error(`Error fetching data: ${error.message}`));
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
    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.getShortLink)(myRequest);

    // reset text field
    link.value = '';
})






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQ3NDO0FBQ3RDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbURBQWE7QUFDckMsZ0VBQWdFLGNBQWM7QUFDOUU7QUFDQTs7Ozs7OztVQ1RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLElBQUk7QUFDOUU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksb0RBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3VybC1zaG9ydGVuaW5nLWFwaS8uL3NyYy9mZXRjaC5qcyIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJsLXNob3J0ZW5pbmctYXBpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmwtc2hvcnRlbmluZy1hcGkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY3JlYXRlIHNob3J0ZW5lZCBsaW5rIHVpXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtEaXYobGluaywgc2hvcnQpIHtcclxuICAgIC8vIGNvbnRhaW5pbmcgZGl2XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIC8vIG9yaWdpbmFsIGxpbmtcclxuICAgIGNvbnN0IG9yaWduYUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIG9yaWduYUxpbmsudGV4dENvbnRlbnQgPSBsaW5rO1xyXG5cclxuICAgIC8vIHNob3J0IGxpbmsgZGl2XHJcbiAgICBjb25zdCBzaG9ydExpbmtEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAvLyBzaG9ydCBsaW5rIFxyXG4gICAgY29uc3Qgc2hvcnRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBzaG9ydExpbmsudGV4dENvbnRlbnQgPSBzaG9ydDtcclxuXHJcbiAgICAvLyBidXR0b25cclxuICAgIGNvbnN0IGNvcHlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY29weUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiY29weVwiO1xyXG4gICAgY29weUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY29weVwiKTtcclxuXHJcbiAgICBzaG9ydExpbmtEaXYuYXBwZW5kKHNob3J0TGluaywgY29weUJ1dHRvbik7XHJcbiAgICBkaXYuYXBwZW5kKG9yaWduYUxpbmssIHNob3J0TGlua0RpdilcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5cclxuLy8gZnVuY3Rpb24gdG8gZGlzcGxheSBzaG9ydGVuZWQgbGluayB1c2luZyBqc29uXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UmVzdWx0KGpzb24pIHtcclxuICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAgLy8gZ2V0IG9yaWdpbmFsIGxpbmtcclxuICAgIGxldCBsaW5rID0ganNvbi5yZXN1bHQub3JpZ2luYWxfbGluaztcclxuICAgIC8vIGdldCBzaG9ydCBsaW5rXHJcbiAgICBsZXQgc2hvcnQgPSBqc29uLnJlc3VsdC5mdWxsX3Nob3J0X2xpbms7XHJcbiAgICAvLyBcclxuICAgIGxldCBkaXYgPSBjcmVhdGVMaW5rRGl2KGxpbmssIHNob3J0KTtcclxuXHJcbiAgICBsZXQgbGlua3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpbmtzLWxpc3RcIik7XHJcblxyXG4gICAgbGlua3NEaXYuYXBwZW5kQ2hpbGQoZGl2KTtcclxufVxyXG5cclxuLy8gbW9iaWxlIG5hdmJhciIsImltcG9ydCB7IGRpc3BsYXlSZXN1bHQgfSBmcm9tIFwiLi9kb21cIjtcclxuLy8gbWFrZSBmZXRjaCByZXF1ZXN0IHRvIGdldCBzaG9ydGVuZWQgbGlua1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRMaW5rKHJlcXVlc3QpIHtcclxuICAgIGZldGNoKHJlcXVlc3QpXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLy8gZGlzcGxheSByZXN1bHRzIHVzaW5nIGpzb24gZGF0YVxyXG4gICAgICAgIC50aGVuKChqc29uKSA9PiBkaXNwbGF5UmVzdWx0KGpzb24pKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIGRhdGE6ICR7ZXJyb3IubWVzc2FnZX1gKSk7XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0U2hvcnRMaW5rIH0gZnJvbSBcIi4vZmV0Y2hcIjtcclxuXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcclxuY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXJsXCIpO1xyXG5cclxuLy8gZXZlbnQgbGlzdGVuZXIgb24gc3VibWl0IHRvIGdldCB1cmwgYW5kIHJ1biBnZXRTaG9ydExpbmtcclxuXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyB1cmwgdG8gc2hvcnRlblxyXG4gICAgbGV0IHVybCA9IGxpbmsudmFsdWU7XHJcblxyXG4gICAgY29uc3QgbXlSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnNocnRjby5kZS92Mi9zaG9ydGVuP3VybD0ke3VybH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgY2FjaGU6ICdkZWZhdWx0JyxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZldGNoIHNob3J0IGxpbmtcclxuICAgIGdldFNob3J0TGluayhteVJlcXVlc3QpO1xyXG5cclxuICAgIC8vIHJlc2V0IHRleHQgZmllbGRcclxuICAgIGxpbmsudmFsdWUgPSAnJztcclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=