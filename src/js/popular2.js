//FT-07 Реализовать подгрузку популярных фильмов на главную (первую) страницу
// import { paginationPopularFilms } from './pagination'
import getFilms from './fetch-popular'
// import AxiosApi from './fetch-popular'
import gallery from '../templates/film-card.hbs'
import genres from './genres.json'
import appendGalleryMarkup from './drow-marckup'
import { btnWatchedInHeader, btnQueueInHeader } from './modal.js';


import Pagination from 'tui-pagination';
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


const logoLink = document.querySelector('.logo__link')
const buttonHome = document.querySelector('.page-header__btn')
const buttonsLibrary = document.querySelector('.library-nav')
const form = document.querySelector('.form')
const headerImg = document.querySelector('.page-header')
const btnMyLibrary = document.querySelector('.library');
const btnHome = document.querySelector('.home');

 let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c&page=1`;

//слушатель на кнопке
buttonHome.addEventListener('click', () => {
        headerImg.classList.remove('library-header')
    headerImg.classList.add('page-header')
    buttonsLibrary.classList.add('is-hidden');
    form.classList.remove('is-hidden');
    showPopularFilm(queryParams)
    // changeMainThemeHeader();
    btnQueueInHeader.classList.remove('current');
  btnWatchedInHeader.classList.remove('current');
  // for modal up


})
 //слушатель на ссылке
logoLink.addEventListener('click', () => {
    headerImg.classList.remove('library-header')
    headerImg.classList.add('page-header')
     buttonsLibrary.classList.add('is-hidden');
    form.classList.remove('is-hidden');
     showPopularFilm(queryParams)
     changeMainThemeHeader();

      btnQueueInHeader.classList.remove('current');
  btnWatchedInHeader.classList.remove('current');
 })




// Правильная
 
// function showPopularFilm(queryParams) {
//     changeMainThemeHeader();
//     let currentPage = null;
//     const pagination = new Pagination('pagination', options);
//     pagination.on('afterMove', (event) => {
//         currentPage = event.page;
//         console.log(currentPage);
//         let page = currentPage;
//         queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c&page=${page}`;
//     });
//     getFilms(queryParams).then(films => {
//         const totalResult = films.results;
//         const pages = films.total_pages;
//         console.log(pages, `всего страниц для пагинации`)
//         appendGalleryMarkup(totalResult)
//  }).catch(error => console.log(error))
// }

function showPopularFilm(queryParams) {
    //собственно рисует интерфейс пагинации
    const pagination = new Pagination('pagination', options);
    //переход по страницам
    pagination.on('afterMove', (event) => {
        //номер страницы, на которую нажали
        const currentPage = event.page;
        let page = currentPage;
        console.log('Для переключения страниц пагинации', page);
        let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c&page=${page}`;
        changeMainThemeHeader();
        getFilms(queryParams).then(films => {
        const totalResult = films.results;
        const pages = films.total_pages;
        console.log(pages, `всего страниц для пагинации`)
        appendGalleryMarkup(totalResult)
 }).catch(error => console.log(error))
    })
  };

// function showPopularFilm(queryParams) {
//     changeMainThemeHeader();
//     getFilms(queryParams).then(films => {
//         const totalResult = films.results;
//         const pages = films.total_pages;
//         console.log(pages, `всего страниц для пагинации`)
//         appendGalleryMarkup(totalResult)
//  }).catch(error => console.log(error))
// }






// setTimeout(() => {
//     paginationPopularFilms();
    
// },300);

function changeMainThemeHeader() {
    headerImg.classList.remove('library-header');
    buttonsLibrary.classList.add('is-hidden');
    form.classList.remove('is-hidden');
    btnMyLibrary.classList.remove('current');
    btnHome.classList.add('current');
}



showPopularFilm(queryParams);