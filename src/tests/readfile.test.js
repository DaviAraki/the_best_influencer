var fs = require('fs');
const converter = require('json-2-csv');

it('should run', () => {
    function readFiles(dirname, onFileContent, onError) {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                onError(err);
                return;
            }
            filenames.forEach(function (filename) {
                fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(filename, content);
                });
            });
        });
    } 
    var dataJson = {};
    readFiles('./public/match105/', function (filename, content) {
        dataJson[filename] = content;
    }, function (err) {
        throw err;
    });
    
    converter.json2csv(dataJson, (err, csv) => {
        if (err) {
            throw err;
        }

        // print CSV string
        console.log(csv);
        fs.writeFileSync('./public/match105.csv', csv);
    });
   

    expect(dataJson).not.toBeUndefined 
});
    