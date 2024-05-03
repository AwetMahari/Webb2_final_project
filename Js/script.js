const apiKey = '4c426d7e09c045839ba9f733e886d4bf';
// Fetching data based on the endpoint
async function fetchData(container, endpoint) {
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(endpoint==`https://api.rawg.io/api/genres?key=${apiKey}`){
          insertGenres_into_container(data,container);
        }else{
          console.log("endpoint:", endpoint , "data:", data);
          insertData_into_container(data,container);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Inserting the fetched data to its container
function insertData_into_container(data,container) {
  container.innerHTML="";
  data.results.forEach(game => {
    let game_div=`<div class="game">
    <div class="game_image_container">
        <img src="${game.background_image}" alt="">
        <div class="game_rates_quantity_and_rates">
            <span class="rates_quantity">
                ${game.ratings_count} <span class="material-symbols-outlined">star</span>
            </span>
            <span class="game_rates">
                <span class="material-symbols-outlined">star</span> 
                <span class="material-symbols-outlined">star</span> 
                <span class="material-symbols-outlined">star</span> 
                <span class="material-symbols-outlined">star</span> 
                <span class="material-symbols-outlined">star</span> 
            </span>
        </div>
    </div>
    <div class="game_cover_details">
        <h1 class="game_name">${game.name}</h1>
        <div class="game_cover_small_details ">
            <div class="game_cover_dates">
                <span class="release_date"> Release Date: ${game.released}</span>
                <span class="updated_date"> Updated: ${game.updated}</span>
            </div>
            <button><a href="game_details.html?game_id=${game.id}">SEE MORE</a></button>
        </div>
    </div>
    </div>`
    container.innerHTML += game_div;
  });
}

// Inserting the fetched genres to their container
function insertGenres_into_container(data,container){
  for (let index = 0; index < data.results.length; index++) {
    const genre = data.results[index];
    const active_genre=(index==0)?"active":"";
    const genre_span=`<span class="Genre ${active_genre}">${genre.name}</span>`;
    if(genre.name!=="RPG"){
       container.innerHTML+=genre_span;
    } 
  }
}

let pageNumber=1;
const topPopularGamesContainer = document.querySelector('.top-popular-games-container .games-list');
const All_Games_Section = document.querySelector('.All_Games_Section .games-list');
const Genre_Games = document.querySelector('.Genres-section .games-list');
const Genres_container = document.querySelector('.Genres-section .Genres');

document.addEventListener('DOMContentLoaded', function() {
  let Genre="action";
  fetchData(topPopularGamesContainer, `https://api.rawg.io/api/games?key=${apiKey}`);
  fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&page=${pageNumber}`);
  fetchData(Genre_Games, `https://api.rawg.io/api/games?key=${apiKey}&genres=${Genre}`);
  fetchData(Genres_container, `https://api.rawg.io/api/genres?key=${apiKey}`);

   // Attach click event listener to document
   document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('Genre')) {
      let genre = clickedElement.textContent;
      genre = genre.toLowerCase();
       // Remove 'active' class from all genres
       const genres_container = document.querySelectorAll(".Genres .Genre");
       genres_container.forEach(genreElement => {
           genreElement.classList.remove('active');
       });

       // Add 'active' class to clicked genre
       clickedElement.classList.add('active');
      fetchData(Genre_Games, `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}`);
    }
  });
});

let prev_page_btn=document.querySelector(".games_page_navigation .prev_btn");
let next_page_btn=document.querySelector(".games_page_navigation .next_btn");

next_page_btn.onclick=()=>{
  pageNumber++;
  let search_input_value=document.querySelector('.search_container .search_input').value;
  fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&search=${search_input_value}&page=${pageNumber}`);
  prev_page_btn.style.display="flex";
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

prev_page_btn.onclick=()=>{
  if(pageNumber>1){
    pageNumber--;
    let search_input_value=document.querySelector('.search_container .search_input').value;
    fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&search=${search_input_value}&page=${pageNumber}`);
    if(pageNumber==1){
      prev_page_btn.style.display="none";
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let search_input=document.querySelector('.search_container .search_input');

search_input.addEventListener("input", ()=>{
  let search_input_value=document.querySelector('.search_container .search_input').value;
  fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&search=${search_input_value}`);
})

