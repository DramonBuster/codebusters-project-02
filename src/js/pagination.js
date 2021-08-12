import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import FilmsApiService from './api-service';
import appendGalleryMarkup from './drow-marckup';

const filmsApiService = new FilmsApiService();

filmsApiService.getFilms();

// Отрисовка популярных фильмов

const logoLink = document.querySelector('.logo__link')
const buttonHome = document.querySelector('.page-header__btn')
 let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;

//слушатель на кнопке
buttonHome.addEventListener('click', () => {
    showPopularFilm(queryParams)
})
 //слушатель на ссылке
logoLink.addEventListener('click', showPopularFilm)

function showPopularFilm() {
   
    filmsApiService.getFilms(queryParams).then(films => {
        const totalResult = films.results;
        const pages = films.total_pages;
        console.log(totalResult, `всего страниц для пагинации`)
        appendGalleryMarkup(totalResult);
 }).catch(error => console.log(error))
}

showPopularFilm(queryParams);

// Поиск по инпуту

const input = document.querySelector('.form__input');
const galleryContainer = document.querySelector('.film-card__list');


input.addEventListener('input', searchQueryFilms);

function fetchFilms() {
  filmsApiService.searchFilms(queryParams)
  .then(films => {
    const queryCards = films.results;
    createGallery(queryCards);
    filmsApiService.resetPage();
  })
  .catch(error => console.log(error));
}

function searchQueryFilms(e) {
e.preventDefault();
clearGallery();
filmsApiService.resetPage();
const currentTarget = e.target.value;
let queryParams = `search/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&page=1&include_adult=false&query=${currentTarget}`;
filmsApiService.query(e.target.value);
  console.log(queryParams);
  fetchFilms();
}

function clearGallery() {
  galleryContainer.innerHTML = ' ';
}

function createGallery(queryCards) {
  appendGalleryMarkup(queryCards);
}

// Добавляет кнопки пагинации из библиотеки

let total = filmsApiService.getFilms.totalResults;
console.log(total);

const options = {
    totalItems: 20000,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
        '</a>'
    }
  };
  
  const pagination = new Pagination('pagination', options);

  // pagination.on('beforeMove', evt => {
  //   const { page } = evt;
  //   // const result = ajax.call({page});
  
  //   if(result) {
  //     pagination.movePageTo(page);
     
  //   } else {
  //     return false;
  //   }
  // });
  
  pagination.on('afterMove', ({ page }) => {
    console.log(page)
    filmsApiService.newPage(page);


    if (input !== document.activeElement) {
      filmsApiService.newPage(page);
      showPopularFilm();
    } else {
      filmsApiService.resetPage();
      fetchFilms();
    }
    });


