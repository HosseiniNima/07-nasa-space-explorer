// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// NASA API key
const apiKey = 'u2kfAy6xpVQmTnhuWgOZwWYPKAvUhV7rp84unLwf';

// Set up the date pickers with:
// - A start date 9 days ago
// - Today as the end date
// - Makes sure you can't pick dates before 1995
setupDateInputs(startInput, endInput);

// Add an event listener to the button to fetch data when clicked
const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', () => {
  // Get the selected start and end dates
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Call the function to fetch data from NASA's API
  fetchNasaData(startDate, endDate);
});

// Function to fetch data from NASA's API
function fetchNasaData(startDate, endDate) {
  // Build the API URL with the selected dates and API key
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  // Use fetch to get data from the API
  fetch(apiUrl)
    .then(response => {
      // Convert the response to JSON
      return response.json();
    })
    .then(data => {
      // Call the function to display the data
      displayNasaData(data);
    })
    .catch(error => {
      // Log any errors to the console
      console.error('Error fetching data:', error);
    });
}

// Function to display the fetched data on the page
function displayNasaData(data) {
  // Find the gallery element on the page
  const gallery = document.getElementById('gallery');

  // Clear any existing content in the gallery
  gallery.innerHTML = '';

  // Loop through the data and create elements for each item
  data.forEach(item => {
    // Create a new div for each item
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';

    // Add the image and details to the div
    itemDiv.innerHTML = `
      <img src="${item.url}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.date}</p>
      <p>${item.explanation}</p>
    `;

    // Add the div to the gallery
    gallery.appendChild(itemDiv);
  });
}
