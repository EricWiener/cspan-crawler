`cspan-crawler` will crawl a c-span video page for you and return the complete transcript in the form:
```javascript
[
  {
    timeStart: "",
    speaker: "",
    text: ""
  },
  {
    timeStart: "",
    speaker: "",
    text: ""
  },
  // ...
]
```

## Installation
```
npm i cspan-crawler --save
```

## Usage:
```javascript
const crawler = require('cspan-crawler');

let url = "https://www.c-span.org/video/?c4772787/senator-murkowski-shutting-government-governing"
let results = crawler.crawl(url);
console.log(results)
```
