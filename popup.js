document.getElementById('scrapeButton').addEventListener('click', () => {
  // Replace this line with the URL you want to scrape
  const scrapeURL = 'https://wsa-test.vercel.app';

  // Fetch the data from the server
  fetch(`http://localhost:3000/scrape?url=${scrapeURL}`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the scraped data, you can display it in your popup or do any other processing here
      console.log(data);

      // Replace the following line with your code to display the data in the popup
      document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

// Add an event listener for the Quick Summary button
document.getElementById('increaseTextSize').addEventListener('click', () => {
  const resultElement = document.getElementById('result');
  // Modify the font size, for example, increase by 2px
  const currentSize = window.getComputedStyle(resultElement, null).getPropertyValue('font-size');
  const newSize = (parseInt(currentSize) + 2) + 'px';
  resultElement.style.fontSize = newSize;
});






