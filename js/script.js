// Get references to the date inputs and button
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const fetchButton = document.querySelector('button');

// NASA API key
const apiKey = 'u2kfAy6xpVQmTnhuWgOZwWYPKAvUhV7rp84unLwf';

// Add an event listener to the button to fetch data when clicked
fetchButton.addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) {
    alert('Please select both a start and end date.');
    return;
  }

  showLoadingMessage();
  fetchNasaPhotos(startDate, endDate);
});

// Function to fetch photos from NASA's API
function fetchNasaPhotos(startDate, endDate) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA API');
      }
      return response.json();
    })
    .then(data => {
      displayPhotos(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      displayErrorMessage('Failed to load images. Please try again.');
    });
}

// Function to display photos in the gallery
function displayPhotos(data) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (!data || data.length === 0) {
    gallery.innerHTML = '<p>No images found for the selected date range.</p>';
    return;
  }

  data.forEach(photo => {
    const formattedDate = new Date(photo.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';
    itemDiv.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" />
      <h3>${photo.title}</h3>
      <p>${formattedDate}</p>
    `;

    // Add click event to open the modal
    itemDiv.addEventListener('click', () => {
      openModal(photo);
    });

    gallery.appendChild(itemDiv);
  });
}

// Function to open the modal
function openModal(photo) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  const formattedDate = new Date(photo.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  modalContent.innerHTML = `
    <span id="close-modal">&times;</span>
    <img src="${photo.url}" alt="${photo.title}" class="modal-image" />
    <h2>${photo.title}</h2>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p>${photo.explanation}</p>
  `;

  modal.style.display = 'block';

  // Close the modal when the close button is clicked
  const closeModal = document.getElementById('close-modal');
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close the modal when clicking outside the modal content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Function to display a loading message
function showLoadingMessage() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '<p>🔄 Loading space photos…</p>';
}

// Function to display an error message in the gallery
function displayErrorMessage(message) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = `<p>${message}</p>`;
}
