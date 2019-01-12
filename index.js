const puppeteer = require('puppeteer');
const $ = require('cheerio');

async function crawl(url){
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("section.transcript div table tbody tr");
    const html = await page.content();
    await browser.close();
    let results = [];
    $('section.transcript div table tbody tr', html).each(function() {
       time = $(this).find('th').text().trim();
       speaker = $(this).find('td strong').text().trim();
       text = $(this).find('td p').text();
       results.push({"timeStart": time, "speaker": speaker, "text": text});
    });
    return results;
  }catch(err){
    console.log(err);
  }
}

crawl("https://www.c-span.org/video/?454506-1/york-city-bar-association-hosts-forum-freedom-speech");

module.exports.crawl = crawl;
