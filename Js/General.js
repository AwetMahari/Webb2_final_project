let hamburger=document.querySelector(".hamburger");
// Add event listener to the whole document
document.addEventListener("click", (event) => {
  // Check if the clicked element or its ancestor has the class "hamburger"
  if (event.target.classList.contains("hamburger") || event.target.closest(".hamburger")) {
    // Toggle the "Shownav" class on the body element
    document.body.classList.toggle("Shownav");
  }
});

// Handle the dark light mode
let darkModeIcon = document.querySelector(".darkModeIcon");
let theme = localStorage.getItem("theme");

darkModeIcon.addEventListener("click", ()=>{
  document.body.classList.toggle("darkMode");
  if (document.body.classList.contains("darkMode")) {
    localStorage.setItem("theme", "dark");
    darkModeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    darkModeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

window.onload = () => {
    if (theme === "dark") {
      document.body.classList.add("darkMode");
      darkModeIcon.classList.replace("fa-moon", "fa-sun")
    } 

    document.querySelector(".loader").style.display = "none";   
}


