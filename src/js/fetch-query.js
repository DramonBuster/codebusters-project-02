import getFilms from './fetch-popular';
import appendGalleryMarkup from './drow-marckup';

const form = document.querySelector('.form');
// const input = document.querySelector('.form__input');
const galleryContainer = document.querySelector('.film-card__list');
const notification = document.querySelector('.notification');
form.addEventListener('submit', serchFilms);

function serchFilms(e) {
  e.preventDefault();
  clearGallery();
  const currentTarget = e.target.elements.searchQuery.value.trim();
  let queryParams = `search/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&page=1&include_adult=false&query=${currentTarget}`;
  console.log(queryParams);
  getFilms(queryParams)
    .then(films => {
      if (films.results.length === 0) {
        notification.classList.remove('is-hidden');
        return;
      }
      const queryCards = films.results;
      createGallery(queryCards);
      // console.log(films.results, `gfdhg`);
    })
    .catch(error => console.log(error));
  form.reset();
}

function clearGallery() {
  galleryContainer.innerHTML = ' ';
}

function createGallery(queryCards) {
  appendGalleryMarkup(queryCards);
}
