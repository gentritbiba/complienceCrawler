var fs = require('fs');
// const page = require("webpage").create();
// global variable 

const Scraper = require("./scraper/Scraper");

const pageCrawlList = [
  {
    url: "https://www.holmesvolvocars.com/volvo-s60-lease-specials.htm",
    rules: [
      {
        rule: "blacklistedWord",
        blacklistedWords: [{
          type: "text",
          value: "Momentum3"
        }]
      },
    ]
  }
]
const scraperI = new Scraper(pageCrawlList[0].url, pageCrawlList[0].rules);
scraperI.start();

//   function onPageReady() {
//     var htmlContent = page.evaluate(function () {
//       return document.documentElement.outerHTML;
//     });

//     page.close();
//     return htmlContent;
//   }


// pageCrawlList.forEach(el => {
//   page.open(el
//     .url, function (status) {
//       if (status !== "success") {
//         console.log("Unable to access network");
//       }
//       else {
//         const html ;
//       }

//     })
// });

// page.open(url, function (status) {
//   function checkReadyState() {
//     setTimeout(function () {
//       var readyState = page.evaluate(function () {
//         return document.readyState;
//       });

//       if ("complete" === readyState) {
//         onPageReady();
//       } else {
//         checkReadyState();
//       }
//     });
//   }

//   checkReadyState();
// });