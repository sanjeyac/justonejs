var cheerio = require('cheerio'),
    fs = require('fs'),
    uglifyjs = require("uglifyjs");

var JS_FILE_NAME = 'all.libs.js';
var CSS_FILE_NAME = 'all.libs.css';

//utils
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// print process.argv and find all HTML files 
process.argv.forEach(function (val, index, array) {
    if (val.endsWith('html') || val.endsWith('HTML')) {
        console.log('PROCESSING: ' + val);
        processFile(val);
    }
});


//read file
function processFile(file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        extract(data);
    });

}

//find all js and css
function extract(text) {
    var $ = cheerio.load(text);

    var css = $('link').map(function () {
        return $(this).attr('href');
    }).get();
    var js = $('script').map(function () {
        return $(this).attr('src');
    }).get();


    console.log('JS FOUND: ' + js);
    console.log('CSS FOUND: ' + css);

    for (var i = 0; i < js.length; i++) {
        js[i] = js[i].trim();
    }

    for (var j = 0; j < css.length; j++) {
        css[j] = css[j].trim();
    }

    uglify(js, css);

}

//process all libs
function uglify(js, css) {
    var result = uglifyjs.minify(js);
    save(JS_FILE_NAME, result.code);
}


//save to file
function save(name, text) {
    fs.writeFile(name, text, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('PROCESS ENDED');
    });
}