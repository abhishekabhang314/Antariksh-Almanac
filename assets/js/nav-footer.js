// common.js

// Function to load a partial HTML file into a specific element
function loadPartial(filePath, elementId) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not load ${filePath}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        document.getElementById(elementId).innerHTML = html;
      })
      .catch(error => console.error('Error loading partial:', error));
  }
  
  // Load the navbar and footer
  //loadPartial('../navbar.html', 'navbar');
  loadPartial('assets/footer.html', 'footer');
  