const fs = require('fs');
const config = require('./config.js');

let fileNameListStr  = "";

let callNum = 0;
let doneNum = 0;

function findindir(root) {
    ++callNum
    let patharr = root.split('/');
    if(patharr[patharr.length - 1].indexOf('.') != -1) {
        console.log(root, "is file");

        if(
            (patharr.indexOf('Map') !== -1) &&
            (root.indexOf('BuiltData') === -1) &&
            (root.indexOf('__ExternalActors__') === -1)
        ) {
            root = root.substr(config.rootPath.length);
            root = root.split('.')[0];
            root = `+MapsToCook=(FilePath="/Game${root}")` + "\n";
            fileNameListStr += root;
        }
        ++doneNum;
        if(callNum === doneNum) { isDone() }
        return;
    }
    fs.readdir(root, function(err, list) {
        if(err) {
            console.log('err : '+ root)
            return;
        }
        console.log(root, list);
        for (let i = 0; i < list.length; i++) {
            findindir(`${root}/${list[i]}`)
        }
        ++doneNum;
        if(callNum === doneNum) { isDone() }
    })
}
findindir(config.rootPath)


function isDone() {
    console.log("------------------");
    console.log(fileNameListStr);

    fs.writeFile(config.saveFile, fileNameListStr, "utf8", function(err) {
        console.log(err);
        console.log("done")
    })
}