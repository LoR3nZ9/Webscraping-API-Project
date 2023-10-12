const express = require('express');
const app = express();
const port = 3000;

const puppeteer = require('puppeteer');
const sentiment = require('sentiment-analysis');

function categorizeSentiment(score) {
  if (score > 0) {
    return 'positive';
  } else if (score < 0) {
    return 'negative';
  } else {
    return 'neutral';
  }
}

function countWords(text) {
  return text.split(/\s+/).filter(word => word).length;
}

async function scrapeDataFromUrl(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const scrapedData = [];

  for (let i = 1; i <= 5; i++) {
    const title = await page.evaluate((index) => {
      const titleElement = document.querySelector(`#__next main div div div:nth-child(2) div:nth-child(${index}) div div:nth-child(2) div:nth-child(1) a`);
      return titleElement ? titleElement.textContent.trim() : '';
    }, i);

    const description = await page.evaluate((index) => {
      const elements = document.querySelectorAll('.ws7dff22');
      return elements.length > index - 1 ? elements[index - 1].textContent.trim() : '';
    }, i);

    const sentimentAnalysis = sentiment(description);

    const image = await page.evaluate((index) => {
      const imageElement = document.querySelector(`#__next main div div div:nth-child(2) div:nth-child(${index}) a img`);
      const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
      const imageUrl = `https://wsa-test.vercel.app${imageSrc}`;
      return imageUrl;
    }, i);

    const href = await page.evaluate((index) => {
      const hrefElement = document.querySelector(`#__next main div div div:nth-child(2) div:nth-child(${index}) a`);
      const hrefUrl = hrefElement ? hrefElement.getAttribute('href') : '';
      return `https://wsa-test.vercel.app${hrefUrl}`;
    }, i);

    const sentimentCategory = categorizeSentiment(sentimentAnalysis.score);
    const wordCount = countWords(description);

    scrapedData.push({
      title,
      short_description: description,
      href,
      image,
      sentiment: sentimentCategory,
      word_count: wordCount,
    });
  }

  await browser.close();
  return scrapedData;
}

app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://wsa-test.vercel.app'; 
    const scrapedData = await scrapeDataFromUrl(url);
    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scraping and analyzing data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
