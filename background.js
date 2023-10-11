// Background script

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === 'scrape') {
      const tab = await chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        function: scrapeData,
      });
      sendResponse({ action: 'scrape_result', data: tab[0].result });
    }
  });
  
  function scrapeData() {
    // Implement your web scraping logic here and return the scraped data
    // Example:
    const title = document.title;
    const description = document.querySelector('meta[name="description"]').content;
    const href = window.location.href;
  
    return {
      title,
      description,
      href
    };
  }
  