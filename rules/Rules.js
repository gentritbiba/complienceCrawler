"use strict";

function Rules(html, rules) {
  console.log("in Rules")
  var self = this;
  this.html = html;
  this.rules = rules;
  this.brokenRules = [];
  this.mapRuleToFunction = {
    "blacklistedWord": self.checkBlacklistedWord,
    "blacklistedUrl": self.checkBlacklistedUrl
  };
}

Rules.prototype.checkForBlacklistedWords = function (blacklistedWords) {
  var self = this;
  blacklistedWords.forEach(function (word) {
    if (self.html.indexOf(word.value) > -1) {
      self.brokenRules.push({
        "rule": 'blacklistedWord',
        "word": word.value
      });
    }
  });
};

Rules.prototype.checkForBlacklistedRegex = function (blacklistedRegex) {
  var self = this;
  blacklistedRegex.forEach(function (regex) {
    var found = self.html.match(regex);

    if (found.length) {
      self.brokenRules.push({
        "rule": 'blacklistedRegex',
        "regex": regex,
        "found": found
      });
    }
  });
};

Rules.prototype.checkForAllRules = function () {
  var self = this;
  this.rules.forEach(function(el) {
    console.log(JSON.stringify(el));
    self.checkForBlacklistedWords(el.blacklistedWords);
  });
  return this.brokenRules;
};

module.exports = Rules;