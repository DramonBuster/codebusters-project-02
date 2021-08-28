//FT-07 Реализовать подгрузку популярных фильмов на главную (первую) страницу
import { paginationPopularFilms } from './pagination';
import getFilms from './fetch';
// import AxiosApi from './fetch-popular'
import gallery from '../templates/film-card.hbs';
import genres from './genres.json';
import appendGalleryMarkup from './drow-marckup';
import { btnWatchedInHeader, btnQueueInHeader } from './modal.js';
import { clearFilter } from './filter';
import {filterPopular} from './filter';

const logoLink = document.querySelector('.logo__link');
const buttonHome = document.querySelector('.page-header__btn');
const buttonsLibrary = document.querySelector('.library-nav');
const form = document.querySelector('.form');
const headerImg = document.querySelector('.page-header');
const btnMyLibrary = document.querySelector('.library');
const btnHome = document.querySelector('.home');
const paginationDiv = document.querySelector('.tui-pagination');
const loader = document.querySelector('.loader');
//убираем нотификацию при клике на кнопки
const notification = document.querySelector('.notification');
const notificationEmty = document.querySelector('.notification-enter');
const noResultDivFilter = document.querySelector('.filter-message');

let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;

//слушатель на кнопке
buttonHome.addEventListener('click', () => {
changeLookOfTheSite()
});
//слушатель на ссылке
logoLink.addEventListener('click', () => {
  changeLookOfTheSite()
  changeMainThemeHeader();
});

export function showPopularFilm(queryParams) {
  loader.classList.remove('is-hidden');
  paginationDiv.classList.remove('is-hidden');
  changeMainThemeHeader();
  getFilms(queryParams)
    .then(films => {
      const totalResult = films.results;
      const pages = films.total_pages;
      const popularMovies = films.total_results;
      localStorage.setItem('popularMovies', popularMovies);
  
      appendGalleryMarkup(totalResult);
      loader.classList.add('is-hidden');
      paginationPopularFilms();
    })
    .catch(error => console.log(error));
    //фильтр по жанру
    filterPopular() 
    // setTimeout(() => {
    //   paginationPopularFilms();
    // }, 300);
}

function changeMainThemeHeader() {
  headerImg.classList.remove('library-header');
  buttonsLibrary.classList.add('is-hidden');
  form.classList.remove('is-hidden');
  btnMyLibrary.classList.remove('current');
  btnHome.classList.add('current');
}

showPopularFilm(queryParams);

//убираем нотификацию при клике на кнопки
function hideNotification() {
    
  notification.classList.add('is-hidden');
  // если в энтер вводим пробелы. убрать
         notificationEmty.classList.add('is-hidden');
        }
//меняем вид странице
function changeLookOfTheSite() {
  headerImg.classList.remove('library-header');
  headerImg.classList.add('page-header');
  buttonsLibrary.classList.add('is-hidden');
  form.classList.remove('is-hidden');
  hideNotification()
  showPopularFilm(queryParams);
  // changeMainThemeHeader();
  btnQueueInHeader.classList.remove('current');
  btnWatchedInHeader.classList.remove('current');
  noResultDivFilter.classList.add('is-hidden');
 
  //убирает фильтр
  clearFilter();
  //фильтр по жанру
  filterPopular() 
}
