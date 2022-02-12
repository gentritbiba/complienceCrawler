var fs = require('fs');
var page = require("webpage").create(),
    url = "http://example.com/index.html";

function onPageReady() {
    var htmlContent = page.evaluate(function () {
        return document.documentElement.outerHTML;
    });
    var path = './test.txt';
    var content = 'Hello World!';
    await fs.write(path, content, 'w', err => {
        if (err) {
            console.error(err);
            phantom.exit();
        }
        console.log('File has been created');
        phantom.exit();
    });
    console.log(htmlContent);

    phantom.exit();
}

page.open(url, function (status) {
    function checkReadyState() {
        setTimeout(function () {
            var readyState = page.evaluate(function () {
                return document.readyState;
            });

            if ("complete" === readyState) {
                onPageReady();
            } else {
                checkReadyState();
            }
        });
    }

    checkReadyState();
});