const Rules = require("../rules/Rules");

// const pageCrawlList = [
//   {
//     url: "https://www.holmesvolvocars.com/volvo-s60-lease-specials.htm",
//     rules: [
//       {
//         rule: "blacklistedWord",
//         blacklistedWords: [{
//           type: "text",
//           value: "Momentum"
//         }]
//       },
//     ]
//   }
// // ]

// class Scraper{
//   constructor(url, rules){
//     this.url = url;
//     this.rules = rules;
//     this.rulesChecker;
//     this.page = phantom.create();
//   }

//   onPageReady = () => {
//     var htmlContent = this.page.evaluate(function () {
//       return document.documentElement.outerHTML;
//     });
//     console.log(this.checkForRules(htmlContent));
//     this.page.close();
//   }
  
//   checkForRules = () => {
//     this.rulesChecker = Rules(htmlContent, this.rules);
//     return this.rulesChecker.checkForAllRules();
//   }

//   start = () => {
//     this.page.open(this
//       .url, function (status) {
//         if (status !== "success") {
//           console.log("Unable to access network");
//         }
//         else {
//           this.onPageReady();
//         }
//       }
//     );
// }
// }

function Scraper(url, rules){
  console.log("in Scraper")
  this.phantom =  require("webpage");
  this.url = url;
  this.rules = rules;
  this.page = this.phantom.create();
}
Scraper.prototype.onPageReady = function(){
  var htmlContent = this.page.evaluate(function () {
    return document.documentElement.outerHTML;
  });
  console.log(JSON.stringify(this.checkForRules(htmlContent)));
  this.page.close();
}
Scraper.prototype.checkForRules = function(htmlContent){
  this.rulesChecker = new Rules(htmlContent, this.rules);
  return this.rulesChecker.checkForAllRules();
}
Scraper.prototype.start = function(){
  var self = this;
  this.page.open(this.url, function (status) {
    if(status !== "success"){
      console.log("Unable to access network");
      phantom.exit();
    }
    function checkReadyState() {
      setTimeout(function () {
        console.log('-------------------');
        console.log(self.page);
        var readyState = self.page.evaluate(function () {
          return document.readyState;
        });
  
        if ("complete" === readyState) {
          self.onPageReady();
          phantom.exit();
        } else {
          checkReadyState();
        }
      });
    }
  
    checkReadyState();
  });
}
module.exports = Scraper;