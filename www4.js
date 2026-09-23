const http = require('http')
const dateTimeET = require('./src/dateTimeET.js')

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Juri Rahhimov, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Juri Rahhimov, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei siselda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req,res){
    res.writeHead(200, {"content-type": "text/html"})
    res.write(pageHead)
    res.write(pageBody)
    res.write('<p>Nädalapäev: ' + dateTimeET.weekDayET() + '</p>')
    let monthType = Math.floor(Math.random() * 2)
    res.write('<p>Kuupäev: ' + dateTimeET.dateET(monthType) + '</p>')
    res.write('<p>Kellaaeg: ' + dateTimeET.timeET() + '</p>')
    res.write(pageFoot)
    return res.end()
}).listen(5315)
