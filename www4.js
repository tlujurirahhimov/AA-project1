const http = require('http')
//moodul URL päringu parsimiseks
const url = require('url')
//moodul failitee haldamiseks
const path = require('path')
//const fs = require('fs')
const fs = require('fs').promises
const dateTimeET = require('./src/dateTimeET.js');
const pageBanner = '<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">'
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Juri Rahhimov, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Juri Rahhimov, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei siselda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req,res){
    console.log(req.url)
    let currentURL = url.parse(req.url, true)
    console.log('Parsituna: ' + currentURL.pathname)
    if (currentURL.pathname === '/') {
      res.writeHead(200, {"content-type": "text/html"})
    res.write(pageBanner)
    res.write(pageHead)
    res.write(pageBody)
    res.write('<p>Nädalapäev: ' + dateTimeET.weekDayET() + '</p>')
    let monthType = Math.floor(Math.random() * 2)
    res.write('<p>Kuupäev: ' + dateTimeET.dateET(monthType) + '</p>')
    res.write('<p>Kellaaeg: ' + dateTimeET.timeET() + '</p>')
    res.write(pageFoot)
    return res.end()  
    } 
    else if (currentURL.pathname === '/vanasona') {
        res.writeHead(200, {"content-type": "text/html"})
    res.write(pageBanner)
    res.write(pageHead)
    res.write('\n\t<h1>Tänase päeva vanasõna</h1>\n\t<p>Siin näed tänaseks loositud Eesti vanasõna.</p>\n\t<hr>')
    res.write(pageFoot)
    return res.end() 
    }
    else if (currentURL.pathname=== '/veebiprogrammeerimine_2026_AA.png') {
        //liidame virtuaalse serveri päris kataloogidega
        let bannerPath = path.join(__dirname, 'pic', currentURL.pathname)
        try{
            const data = await fs.readFile(bannerPath)
            res.writeHead(200, {"Content-type": "image/png"})
            return res.end(data)
        } catch (err){
            res.writeHead(404, {"content-type": "text/plain; charset=utf8"})
            return res.end('Pilti ei leitud')
        }
    }
/*    else if (currentURL.pathname=== '/veebiprogrammeerimine_2026_AA.png') {
        //liidame virtuaalse serveri päris kataloogidega
        let bannerPath = path.join(__dirname, 'pic', currentURL.pathname)
        fs.readFile(bannerPath, (err,data)=>{
            if (err) {
                throw(err)
            } else {
                res.writeHead(200, {"Content-type": "image/png"})
                res.end(data)
            }
        })
    } */

    else {
        res.end('Viga 404! Ei leia sellist lehte!')
    }
    
}).listen(5315)
