// JSON data for cities to be displayed
const cities = [ 
  { 
      "city": "Gorée", 
      "country": "Senegal", 
      "continent": "Africa", 
      "image": "https://lp-cms-production.imgix.net/2023-03/500pxRF_42366822.jpg?auto=format,compress&q=72&fit=crop.jpg"
  }, 
  {
      "city": "Cancún",
      "country": "Mexico",
      "continent": "North America",
      "image": "https://www.rutasyrutinas.com/wp-content/uploads/2019/10/hotel-cancun-fiesta-americana11.jpg"
  }, 
  {
      "city": "Bangkok",
      "country": "Thailand",
      "continent": "Asia",
      "image": "https://linkstravelandtours.co.uk/wp-content/uploads/2018/12/bangkok-temple-dawn-thailand.jpg"
  }, 
  {
      "city": "Salvador",
      "country": "Brazil",
      "continent": "South America",
      "image": "https://lp-cms-production.imgix.net/2022-08/iStock-1322713774.jpg"
  }, 
  {
    "city": "Reykjavík",
    "country": "Iceland",
    "continent": "Europe",
    "image": "https://images.ctfassets.net/w65k7w0nsb8q/6RINnJSwvuUo88s8Mgc4s4/46f766f05011c6b85e0f7bdd36d6cf12/Blue_Lagoon_Northernlights.jpg?w=3840&q=75&fm=webp"
  }, 
  {
    "city": "Santorini",
    "country": "Greece",
    "continent": "Europe",
    "image": "https://i0.wp.com/www.wanderfullyrylie.com/wp-content/uploads/2024/03/Dream-Destinaitons-To-Add-To-Your-Bucket-List-Travel-Wanderfully-Rylie-Weekend-Adventure-Adventurer-Blog-5.png?resize=1536%2C864&ssl=1"
  }, 
  {
    "city": "Nassau",
    "country": "Bahamas",
    "continent": "North America",
    "image": "https://assets.dmagstatic.com/wp-content/uploads/2023/07/Atlantis-Resorts-Nassau-Bahamas-exterior-view-1200x800.jpg"
  }, 
  {
    "city": "Sasaab",
    "country": "Kenya",
    "continent": "Africa",
    "image": "https://cdn.shortpixel.ai/spai/q_glossy+ret_img+to_auto/www.discoverafrica.com/wp-content/uploads/wetu/19848/sasaab-2019-1254-1800x1080.jpg"
  }, 
  {
    "city": "Sydney",
    "country": "Australia",
    "continent": "Oceania",
    "image": "https://images.squarespace-cdn.com/content/v1/55ee34aae4b0bf70212ada4c/1577545161018-1F9Z9ZZQG9JO2O4WCWQX/keith-zhu-qaNcz43MeY8-unsplash+%281%29.jpg?format=1500w"
  }, 
  {
    "city": "Tahiti",
    "country": "French Polynesia",
    "continent": "Oceania",
    "image": "https://www.tahitilegends.com/images/territories/tahiti.jpg"
  }, 
  {
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "continent": "South America",
    "image": "https://media.timeout.com/images/105482246/image.jpg"
  }, 

]

// Global set to keep track which continents are selected
let selectedContinents = new Set(); 

// This function manages the states (hover, click, etc) of the continents filter 
function handleContinentStates() { 
  // an array of all the `continent-items`
  const continentItems = document.querySelectorAll('.continent-item'); 

  continentItems.forEach(item => { 
    const img = item.querySelector('.continent-image'); // get the image element
    const text = item.querySelector('.continent-text'); // get the text element

    // helper function to set the hover style 
    const setHoverStyle = () => { 
      img.src = img.getAttribute('data-hover'); 
      text.style.color = '#000'
    }; 

    // helper function to set the default style 
    const setDefaultStyle = () => { 
      img.src = img.getAttribute('data-default'); 
      text.style.color = '#ccc'
    }


    // Event listener for when the item is being hovered
    item.addEventListener('mouseenter', () => { 
      if (!item.classList.contains('selected')) {        // check if the item is not selected 
        setHoverStyle();   
      }
    }); 

    // Event listener for when the item is not being hovered anymore
    item.addEventListener('mouseleave', () => { 
      if (!item.classList.contains('selected')) {   // check if item is not selected 
        setDefaultStyle(); 
      }
    }); 

    // Event listener for when an item is clicked
    item.addEventListener('click', () => { 
      item.classList.toggle('selected');          // toggle the "selected" on the item
      const continent = text.textContent.trim();  // get the continent that was selected 
      
      // if "selected" is toggled on, keep the styling from the hover state and add the current continent to selectedContinents
      // else, revert back to the default styling and removed the continent from selectedContinents
      if (item.classList.contains('selected')) { 
        setHoverStyle(); 
        selectedContinents.add(continent);

      } else { 
        setDefaultStyle();  
        selectedContinents.delete(continent);              
      }

      showCards(); // re-render the cards after deletion
    });

  });
}

// This function creates a new city 
function createCity() { 
  const input = document.getElementById("destination"); // get the destination info from input field 
  const value = input.value.trim()                      // remove extra whitespace (e.g. "Tokyo, Japan, Asia")

  const parts = value.split(",");  // Array ["Tokyo", "Japan", "Asia"]
  const [city, country, continent] = parts; // use object destructing to retrieve data from user input

  const newCity = { 
    city, 
    country, 
    continent, 
    image: "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1.jpg" // placeholder image 
  }; 

  cities.push(newCity); // Add to cities array
  showCards();          // Re-render cards with filtering applied
  input.value = "";     // Clear the input
}

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container"); // select the container
  const templateCard = document.querySelector(".card");            // select the template card

  cardContainer.innerHTML = "";   // clear the container     

  // Get the filtered list based on the selected continents 
  const filteredCities = getFilteredCities(); 

  // loop through the cities array
  // for each city: 
  //  (1) clone the template card 
  //  (2) update the cloned card with city info 
  //  (3) set up the event listener for the delete button 
  //  (3) append updated card to the container 
  filteredCities.forEach((city, index) => {           // include the index in the loop 
    const newCard = templateCard.cloneNode(true);     // Copy the template card 
    editCardContent(newCard, city);                   // edit image and text content 

    // Set the data-index on the delete button
    const deleteButton = newCard.querySelector('.card-delete-btn');    // get the delete button for the card
    deleteButton.setAttribute('data-index', index);                   // set the index for that card 

    // Attach event listener for deleting the card 
    //  (1) get the index of the card 
    //  (2) get the city that is to be removed 
    //  (3) find and remove the city in the original array 
    //  (4) re-render the cards
    deleteButton.addEventListener('click', (e) => { 
      const cardIndex = e.currentTarget.getAttribute('data-index');
      const cityToRemove = filteredCities[cardIndex]; 
      
      const originalIndex = cities.findIndex(c => c.city == cityToRemove.city)
      if (originalIndex !== -1) { 
        cities.splice(originalIndex, 1) // Remove the city from the original `cities` array
      }

      showCards(getFilteredCities());   // Re-render the cards with updated list
    }); 

    cardContainer.appendChild(newCard); // Add the new card to the container 
  });
}

// This function updates the card info
function editCardContent(card, city) {
  card.style.display = "block";

  const img = card.querySelector("img"); // get the image
  const ul = card.querySelector("ul");   // get the contents of the card

  // Update the image 
  img.src = city.image; 
  img.alt = `${city.city}, ${city.country}` // use string interpolation to create the contents of the `alt` tag 

  // Update the text 
  ul.innerHTML = `
  <li class="city-text">${city.city}</li> 
  <li>${city.country}</li> 
  <li>${city.continent}</li> 
  `; 
}

// This is a helper function that returns the cities from the continent selected 
function getFilteredCities() { 
  if (selectedContinents.size === 0) return cities; // no selected continents, show all the cities in the array 
  return cities.filter(city => selectedContinents.has(city.continent))  // filter the cities who continent matches those in the selected continents
}

// When the page is first loaded, 
//  (1) Handle the states for the Continent filter 
//  (2) Show the cards for each city
//  (3) Create a new city is the add button is clicked 
document.addEventListener("DOMContentLoaded", () => { 
  handleContinentStates(); 
  showCards(); 
  const addButton = document.querySelector('.add-destination-btn'); 
  addButton.addEventListener('click', createCity)
}); 