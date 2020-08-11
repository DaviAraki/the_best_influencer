var fs = require('fs');


it('should run', async () => {
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
    expect(dataJson).not.toBeUndefined 

});
    