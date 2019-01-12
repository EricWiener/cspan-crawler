const puppeteer = require('puppeteer');
const url = 'https://www.c-span.org/video/?449705-1/supreme-court-nominee-brett-kavanaugh-confirmation-hearing-day-2-part-1';
const $ = require('cheerio');

puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage();
    })
    .then(function(page) {
      return page.goto(url).then(function() {
        return page.waitForSelector("section.transcript").then(function(){
          return page.content();
        })
      });
    })
    //.load-transcript table tbody tr
    .then(function(html) {
      let results= []
      $('section.transcript div table tbody tr', html).each(function() {
         time = $(this).find('th').text().trim()
         console.log(time)
         speaker = $(this).find('td strong').text().trim()
         console.log(speaker)
         text = $(this).find('td p').text()
         console.log(text)
         results.push({"timeStart": time, "speaker": speaker, "text": text})
      });

      console.log(JSON.stringify(results))
    })
    .catch(function(err) {
      console.log(err)
    });
