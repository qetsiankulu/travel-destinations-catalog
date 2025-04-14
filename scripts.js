/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */


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
  }

]

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
    image: "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1.jpg"
  }; 

  // Add to cities array
  cities.push(newCity); 

  // Re-render cards
  showCards(); 

  // Clear the input
  input.value = ""; 
}

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container"); // select the container
  const templateCard = document.querySelector(".card");            // select the template card

  cardContainer.innerHTML = "";   // clear the container 

  // loop through the cities array
  // for each city: 
  //  (1) clone the template card 
  //  (2) update the cloned card with city info 
  //  (3) append updated card to the container 
  cities.forEach(city => { 
    const newCard = templateCard.cloneNode(true);     // Copy the template card 
    editCardContent(newCard, city);               // edit image and text content 
    cardContainer.appendChild(newCard);             // Add the new card to the container 
  });
}

// This function manages the states (hover, click, etc) of the continent filter
function handleContinentStates() { 
  // an array of all the `continent-items`
  const continentItems = document.querySelectorAll('.continent-item'); 

  continentItems.forEach(item => { 
    const img = item.querySelector('.continent-image'); // get the image element
    const text = item.querySelector('.continent-text'); // get the text element

    // Event listener for when the item is being hovered
    item.addEventListener('mouseenter', () => { 
      if (!item.classList.contains('selected')) {        // check if the item 
        img.src = img.getAttribute('data-hover');        // change the image source
        text.style.color = '#000';                      // change the color 
      }
    });

    // Event listener for when the item is not being hovered anymore
    item.addEventListener('mouseleave', () => { 
      if (!item.classList.contains('selected')) { 
        img.src = img.getAttribute('data-default'); // revert back to the original image source
        text.style.color = '#ccc';                  // revert back to the original color
      }
    }); 

    // Event listener for when an item is clicked
    item.addEventListener('click', () => { 
      item.classList.toggle('selected');       // toggle the "selected" class on the `continent-item` when its clicked 
      
      // if "selected" is toggled on, keep the styling from the hover state
      // else, revert back to the default styling 
      if (item.classList.contains('selected')) { 
        img.src = img.getAttribute('data-hover');       
        text.style.color = '#000';                      
       } else { 
          img.src = img.getAttribute('data-default'); 
          text.style.color = '#ccc';                    
      }
    });
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

  // console.log for debugging
  console.log("new card:", city.city, "- html: ", card);
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

