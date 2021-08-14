import getFilms from './fetch-popular'
import appendGalleryMarkup from './drow-marckup'
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const paginationBtn = document.querySelector('.tui-page-btn');
const paginationContainer = document.getElementById('pagination');
const paginationButtons = document.querySelectorAll('#pagination .tui-page-btn');

//параметры пагинации
export const options = {
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
//функция для пагинации популярных фильмов
export function paginationPopularFilms() {
  //собственно рисует интерфейс пагинации
  options.totalItems = localStorage.popularMovies;
  console.log('Options Popular', options.totalItems);
  const pagination = new Pagination('pagination', options);
  //переход по страницам
  pagination.on('afterMove', (event) => {
      //номер страницы, на которую нажали
      const currentPage = event.page;
      let page = currentPage;
      console.log('Для переключения страниц пагинации', page);
      let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c&page=${page}`;
      getFilms(queryParams)
          .then(films => {
          const totalResult = films.results;
          appendGalleryMarkup(totalResult)
          console.log(films.results, gfdhg);
      })
          .catch(error => console.log(error));
  })
};
//функция для пагинации фильмов по запросу
export function paginationSearchFilms() {
  //проверка локалСторадж на правильное слово инпута
  console.log("количество фильмов в локале", localStorage.movies)
  //в параметры пагинации вносим количество фильмов из LocalStorage
  options.totalItems = localStorage.movies;
  //собственно рисует интерфейс пагинации
  const pagination = new Pagination('pagination', options);
  //возвращает на первую страницу
  pagination.movePageTo(1);
  //переход по страницам
  pagination.on('afterMove', (event) => {
      const currentPage = event.page;
      let str = currentPage;
      let slovo = localStorage.input;
      console.log("slovo", slovo);
      let queryParams = `search/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&page=${str}&include_adult=false&query=${slovo}`;
      getFilms(queryParams)
          .then(films => {
              const totalResult = films.results;
              appendGalleryMarkup(totalResult)
              })
          .catch(error => console.log(error));
  }); 
};

//функция для пагинации фильмов по библиотеке
export function paginationLibraryFilms(savedQueueFilmsInLocalStorage) {
  console.log('savedQueueFilmsInLocalStorage', savedQueueFilmsInLocalStorage);
  //проверка локалСторадж на правильное слово инпута
  console.log("количество фильмов в локале", JSON.parse(localStorage.queue).length)
  //в параметры пагинации вносим количество фильмов из LocalStorage
  const queueA = JSON.parse(localStorage.queue);

  options.totalItems = JSON.parse(localStorage.queue).length;

  // if (queueA.length > options.itemsPerPage) {
  //   const a = queueA.slice(0, 20);
  //   a.page = 1;
  //   console.log(a);
  //   appendGalleryMarkup(a);
  // }

  console.log('itemsPerPage', options.itemsPerPage);
  const queueArray = JSON.parse(localStorage.queue);

  // options.itemsPerPage
  console.log(options.itemsPerPage);

  // if(options.totalItems < queueLength) {
  //   page += 1
  // }
  //собственно рисует интерфейс пагинации
  const pagination = new Pagination('pagination', options);
  //возвращает на первую страницу
  pagination.movePageTo(1);
  //переход по страницам
  pagination.on('afterMove', (event) => {
      const currentPage = event;
      console.log('Проверка', currentPage);
      
      let str = currentPage;
      let slovo = localStorage.input;
      console.log("slovo", slovo);
      const queue = JSON.parse(localStorage.queue);
      console.log('Local Queue', queue);
      console.log('GHBDTN');
  
      // let queryParams = `search/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&page=${str}&include_adult=false&query=${slovo}`;
      // getFilms(queryParams)
      //     .then(films => {
      //         const totalResult = films.results;
      //         appendGalleryMarkup(totalResult)
      //         })
      //     .catch(error => console.log(error));
  }); 
};

// Прячет одну страницу

// export function hidePaginationBtns() {
//   if (options.totalItems <= 20) {
//     paginationContainer.classList.add('is-hidden');
//   }
// }

// export function showPaginationBtns() {
//   console.log(options.totalItems);
//   paginationContainer.classList.remove('is-hidden');
// }

// hidePaginationBtns();
console.log('ПРОВЕРКА');