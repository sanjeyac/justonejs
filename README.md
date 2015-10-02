# Just One Js

JustOneJs is a command line utility based on NodeJs.

It reads the html file passed as argument, it extracts all the scripts linked in the html and then minifies all the files into javascript file, easy to upload and mantain.

The html parsing is done with Cheerio and the compression is done with  UglifyJS 2

This is just for fast prototyping and simple apps, use Grunt, Gulp or other automation tool for serious things...

## Usage

git clone https://github.com/sanjeyac/justonejs.git
npm install
nodejs justone.js <input html file>

an output file will be created 'all.libs.js'
