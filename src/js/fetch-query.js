import getFilms from './fetch';
import appendGalleryMarkup from './drow-marckup';
import { paginationSearchFilms } from './pagination';
import { clearFilter } from './filter';
import { showPopularFilm } from './popular';


const form = document.querySelector('.form');
// const input = document.querySelector('.form__input');
const galleryContainer = document.querySelector('.film-card__list');
const notification = document.querySelector('.notification');
const notificationEmty = document.querySelector('.notification-enter');
const paginationDiv = document.querySelector('.tui-pagination');
const noResultDiv = document.querySelector('.no-result');
const loader = document.querySelector('.loader');

form.addEventListener('submit', serchFilms);

function serchFilms(e) {
  // loader
  loader.classList.remove('is-hidden');
  // cursor spiner
  document.body.style.cursor = 'wait';
  //
  e.preventDefault();

  //cкрываем нотификацию
  hideNotification()
  const currentTarget = e.target.elements.searchQuery.value.trim();
  if (currentTarget === '') {
    showNotificationEmptyRequest() 
     
 
     setTimeout(() => {
    document.body.style.cursor = 'default';
  }, 100);
    return
  }
    clearFilter()
    clearGallery();
loader.classList.remove('is-hidden');
 
  localStorage.setItem('input', currentTarget);
  let queryParams = `search/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&page=1&include_adult=false&query=${currentTarget}`;
  console.log(queryParams);
  getFilms(queryParams)
    .then(films => {
     
      if (films.results.length !== 0) {
        //  clearGallery();
     
         paginationDiv.classList.remove('is-hidden');
      const movies = films.total_results;
      localStorage.setItem('movies', movies);
      const queryCards = films.results;
      createGallery(queryCards);
      loader.classList.add('is-hidden');
        return;
      }
      loader.classList.add('is-hidden');
      notification.classList.remove('is-hidden');
      let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;
      showPopularFilm(queryParams);
 
    })
    .catch(error => {
      paginationDiv.classList.add('is-hidden');
      noResultDiv.classList.remove('is-hidden');
      console.log(error);
    });
    // end cursor spinner
    setTimeout(() => {
    document.body.style.cursor = 'default';
    }, 100);
    //
    //запускаем пагинацию фильмов по названию
     setTimeout(() => {
       paginationSearchFilms();
     }, 300);
     form.reset();
}

export function clearGallery() {
  paginationDiv.classList.add('is-hidden');
  galleryContainer.innerHTML = ' ';
}

function createGallery(queryCards) {
  appendGalleryMarkup(queryCards);
}

function hideNotification() {
  notification.classList.add('is-hidden');
   notificationEmty.classList.add('is-hidden');
   
}
function showNotificationEmptyRequest() {
  notificationEmty.classList.remove('is-hidden');
  loader.classList.add('is-hidden');
}
