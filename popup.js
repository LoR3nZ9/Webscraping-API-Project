document.getElementById('scrapeButton').addEventListener('click', () => {
  
  const scrapeURL = 'https://wsa-test.vercel.app';

  fetch(`http://localhost:3000/scrape?url=${scrapeURL}`)
    .then((response) => response.json())
    .then((data) => {
     
      console.log(data);

      document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});


document.getElementById('increaseTextSize').addEventListener('click', () => {
  const resultElement = document.getElementById('result');
  
  const currentSize = window.getComputedStyle(resultElement, null).getPropertyValue('font-size');
  const newSize = (parseInt(currentSize) + 2) + 'px';
  resultElement.style.fontSize = newSize;
});






