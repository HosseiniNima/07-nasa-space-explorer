// Get references to the date inputs and button
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const fetchButton = document.querySelector('button');

// NASA API key
const apiKey = 'u2kfAy6xpVQmTnhuWgOZwWYPKAvUhV7rp84unLwf';

// Add an event listener to the button to fetch data when clicked
fetchButton.addEventListener('click', () => {
  // Get the selected start and end dates
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Check if both dates are selected
  if (!startDate || !endDate) {
    alert('Please select both a start and end date.');
    return;
  }

  // Fetch data from NASA's API
  fetchNasaPhotos(startDate, endDate);
});

// Function to fetch photos from NASA's API
function fetchNasaPhotos(startDate, endDate) {
  // Build the API URL with the selected dates and API key
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  // Use fetch to get data from the API
  fetch(apiUrl)
    .then(response => {
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA API');
      }
      return response.json(); // Convert the response to JSON
    })
    .then(data => {
      // Display the fetched data in the gallery
      displayPhotos(data);
    })
    .catch(error => {
      // Log any errors and show an error message
      console.error('Error fetching data:', error);
      displayErrorMessage('Failed to load images. Please try again.');
    });
}

// Function to display photos in the gallery
function displayPhotos(data) {
  // Get the gallery element
  const gallery = document.getElementById('gallery');

  // Clear any existing content in the gallery
  gallery.innerHTML = '';

  // Check if there are any photos in the data
  if (!data || data.length === 0) {
    gallery.innerHTML = '<p>No images found for the selected date range.</p>';
    return;
  }

  // Loop through the data and create a gallery item for each photo
  data.forEach(photo => {
    // Create a new div for the gallery item
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';

    // Add the photo, title, and date to the div
    itemDiv.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" />
      <h3>${photo.title}</h3>
      <p>${photo.date}</p>
    `;

    // Add the gallery item to the gallery
    gallery.appendChild(itemDiv);
  });
}

// Function to display an error message in the gallery
function displayErrorMessage(message) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = `<p>${message}</p>`;
}
