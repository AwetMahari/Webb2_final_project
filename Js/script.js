const apiKey = '4c426d7e09c045839ba9f733e886d4bf';
async function fetchData(container, fetching_link) {
  const endpoint = fetching_link;
  
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        insertData_into_container(data,container);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

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

let pageNumber=1;
const topPopularGamesContainer = document.querySelector('.top-popular-games-container .games-list');
const All_Games_Section = document.querySelector('.All_Games_Section .games-list');

document.addEventListener('DOMContentLoaded', function() {
  fetchData(topPopularGamesContainer, `https://api.rawg.io/api/games?key=${apiKey}`);
  fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&page=${pageNumber}`);
});

fetchData(topPopularGamesContainer, `https://api.rawg.io/api/games?key=${apiKey}`);
fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&page=${pageNumber}`);

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

/*
let search_btn=document.querySelector('.search_container .search_btn');
search_btn.onclick=()=>{
  let search_input_value=document.querySelector('.search_container .search_input').value;
  fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&search=${search_input_value}`);
}*/

let search_input=document.querySelector('.search_container .search_input');

search_input.addEventListener("input", ()=>{
  let search_input_value=document.querySelector('.search_container .search_input').value;
  fetchData(All_Games_Section, `https://api.rawg.io/api/games?key=${apiKey}&search=${search_input_value}`);
})

