import getFilms from './fetch';
import modalFilm from '../templates/modal.hbs';
import appendGalleryMarkup from './drow-marckup';
// import cardForFilm from '../templates/film-card.hbs';
import { paginationQueueFilms, paginationWatchedFilms } from './pagination';

import { filterQueue, filterWatched, clearFilter} from './filter';

let btnWachedInModal;
let btnQueueInModal;
let openedFilm;

const cards = document.querySelector('.film-card__list');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const LOCALSTORAGE_WATCHED = 'watched';
const LOCALSTORAGE_QUEUE = 'queue';
const noResultDiv = document.querySelector('.no-result');
let btn = document.querySelector('#toTop');
const noResultDivFilter = document.querySelector('.filter-message');


// Запуск библиотеки по кнопке MY LIBRUARY
const btnMyLibrary = document.querySelector('.library');
const cardList = document.querySelector('.film-card__list');
const libButtons = document.querySelector('.library-nav');
const form = document.querySelector('.form');
const paginationDiv = document.querySelector('.tui-pagination');
//убираем нотификацию при клике на кнопки
const notification = document.querySelector('.notification');

// export to popular
export const btnWatchedInHeader = document.querySelector('button[data-info="watched"]');
export const btnQueueInHeader = document.querySelector('button[data-info="queue"]');

// Работа с модальным окном - открытие и закрытие
cards.addEventListener('click', onModalOpen);

function onModalOpen(evt) {
  evt.preventDefault();
  
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  onGetFilm(evt);

  backdrop.classList.remove('is-hidden');
  modal.classList.remove('is-hidden');
  body.classList.add('modal-open');
   btn.classList.remove('show');
  backdrop.addEventListener('click', evt => {
    if (!evt.target.classList.contains('backdrop')) {
      return;
    }
    onModalClose();
  });

  window.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') onModalClose(evt);
  });
}

function onGetFilm(evt) {
  let queryParams = `movie/${evt.target.dataset.id}?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US`;

  getFilms(queryParams)
    .then(film => onModalMakeCard(film))
    .catch(error => console.log(error, 'ошибка!!!  что-то не так с запросом'));
}

function onModalMakeCard(film) {
  openedFilm = film;
  openedFilm.genres = openedFilm.genres.map(genre => genre.name).join(', ');
  //оставляем в рейтинге популярности одно число после запятой = 1.2836 станет 1.2
  openedFilm.popularity = openedFilm.popularity.toFixed(1);

  const modalCard = modalFilm(openedFilm);

  // modal.innerHTML = modalCard;

  modal.insertAdjacentHTML('beforeend', modalCard);

  btnWachedInModal = document.querySelector('.watched');
  btnQueueInModal = document.querySelector('.queue');

  const btnModalClose = document.querySelector('.button-close');
  btnModalClose.addEventListener('click', onModalClose);

  //пробные данные для ЛС
  // localStr.push(openedFilm);
  // localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify(localStr));

  onCheckLocalStorage(openedFilm);

  btnWachedInModal.addEventListener('click', evt => {
    onAddRemoveWachedToLocalStorage(evt, openedFilm);
  });

  btnQueueInModal.addEventListener('click', evt => {
    onAddRemoveQueueToLocalStorage(evt, openedFilm);
  });
}

function onCheckLocalStorage(openedFilm) {
  console.log('проверка фильма!!!');
  if (
    !btnWatchedInHeader.classList.contains('current') ||
    !btnQueueInHeader.classList.contains('current')
  ) {
    if (
      localStorage.length === 0 ||
      (localStorage.getItem(LOCALSTORAGE_WATCHED) === '[]' &&
        localStorage.getItem(LOCALSTORAGE_QUEUE) === '[]')
    ) {
      return;
    } else {
      console.log('ищем фильм для смены кнопок!!!');
      onSearchFilmInLocalStorageToChangeButtons(openedFilm);
    }
  } else {
    if (
      localStorage.getItem(LOCALSTORAGE_WATCHED) !== '[]' ||
      localStorage.getItem(LOCALSTORAGE_QUEUE) !== '[]'
    ) {
      console.log(localStorage.getItem(LOCALSTORAGE_QUEUE));
      onSearchFilmInLocalStorageToChangeButtons(openedFilm);
    } else {
      cardList.innerHTML = '';
      console.log('ОШИБКА ТУТааааааааааааааааааааааа!!!!!!!!!!!!!!!!');
    }
  }
}

function onSearchFilmInLocalStorageToChangeButtons(openedFilm) {
  const savedWachedFilms = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));
  const savedQueueFilms = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

  if (localStorage.getItem(LOCALSTORAGE_WATCHED) !== null) {
    savedWachedFilms.forEach(savedWachedFilm => {
      if (openedFilm.id !== Number(savedWachedFilm.id)) {
        return;
      }
      btnWachedInModal.textContent = 'remove from watched';
      btnWachedInModal.dataset.action = 'remove';
    });
  }

  if (localStorage.getItem(LOCALSTORAGE_QUEUE) !== null) {
    savedQueueFilms.forEach(savedQueueFilm => {
      if (openedFilm.id !== Number(savedQueueFilm.id)) {
        return;
      }
      btnQueueInModal.textContent = 'remove from queue';
      btnQueueInModal.dataset.action = 'remove';
    });
  }
}

function onAddRemoveWachedToLocalStorage(evt, openedFilm) {
  if (evt.target.dataset.action === 'remove') {
    btnWachedInModal.textContent = 'add to watched';
    btnWachedInModal.dataset.action = 'add';

    const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

    const modifiedSavedFilms = filmsFromLocalStorage.filter(
      filmFromLocalStorage => filmFromLocalStorage.id !== openedFilm.id,
    );

    localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify(modifiedSavedFilms));
  } else {
    btnWachedInModal.textContent = 'remove from watched';
    btnWachedInModal.dataset.action = 'remove';

    if (localStorage.getItem(LOCALSTORAGE_WATCHED) === null) {
      localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify([openedFilm]));
    } else {
      const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

      filmsFromLocalStorage.push(openedFilm);

      localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify(filmsFromLocalStorage));
    }
  }
}

function onAddRemoveQueueToLocalStorage(evt, openedFilm) {
  if (evt.target.dataset.action === 'remove') {
    btnQueueInModal.textContent = 'add to queue';
    btnQueueInModal.dataset.action = 'add';

    const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

    const modifiedSavedFilms = filmsFromLocalStorage.filter(
      filmFromLocalStorage => filmFromLocalStorage.id !== openedFilm.id,
    );

    localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify(modifiedSavedFilms));
  } else {
    btnQueueInModal.textContent = 'remove from queue';
    btnQueueInModal.dataset.action = 'remove';

    if (localStorage.getItem(LOCALSTORAGE_QUEUE) === null) {
      localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify([openedFilm]));
    } else {
      const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

      filmsFromLocalStorage.push(openedFilm);

      localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify(filmsFromLocalStorage));
    }
  }
}

function onModalClose(evt) {
  //  btn.classList.add('show');
  if (btnQueueInHeader.classList.contains('current')) {
    if (btnQueueInModal.dataset.action === 'add') {
      onMadeQueueGallery();
    }
  } else if (btnWatchedInHeader.classList.contains('current')) {
    if (btnWachedInModal.dataset.action === 'add') {
      onMadeWatchedGallery();
    }
  }

  backdrop.classList.add('is-hidden');
  modal.classList.add('is-hidden');
  body.classList.remove('modal-open');

  modal.innerHTML = '';
}

btnMyLibrary.addEventListener('click', evt => {
  // По нажатию кнопки МАЙ ЛИБ скрываем или открываем нужные элементы хедера
  libButtons.classList.remove('is-hidden');
  form.classList.add('is-hidden');
  // убираем нотификацию при переключении
  showNotification();

  // Вешаем слушателей на кнопки и запускаем функцию отрисовки новой галереи
  btnWatchedInHeader.addEventListener('click', onMadeWatchedGallery);
  btnQueueInHeader.addEventListener('click', onMadeQueueGallery);
  onMadeQueueGallery();
});

export function onMadeWatchedGallery() {
  cardList.innerHTML = '';

  btnQueueInHeader.classList.remove('current');
  btnWatchedInHeader.classList.add('current');
  if (
    localStorage.getItem(LOCALSTORAGE_WATCHED) === null ||
    JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED) === '[]')
  ) {
    // Скрывает кнопки, если библиотека пуста
    paginationDiv.classList.add('is-hidden');
    noResultDiv.classList.remove('is-hidden');
    //убираем фильтр
    clearFilter();
    return;
  }

  const savedWatchedFilmsInLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

  /**
   * ВРЕМЕННОЕ РЕШЕНИЕ: фильтрация картинки
   */
  // const a = savedWatchedFilmsInLocalStorage.map(film => {
  //   film.poster_path = `https://image.tmdb.org/t/p/original${film.poster_path}`;

  //   console.log(film, `gjhvjhv`);
  // });
  // console.log(a, `wowwo`);
  appendGalleryMarkup(savedWatchedFilmsInLocalStorage.slice(0, 20));
  // cardList.innerHTML = cardForFilm(savedWatchedFilmsInLocalStorage);
  // Пагинация для просмотренных фильмов
  paginationWatchedFilms();
  //рисуем фильтр по жанрам
  filterWatched();
  noResultDivFilter.classList.add('is-hidden');
}

export function onMadeQueueGallery() {
  cardList.innerHTML = '';

  btnWatchedInHeader.classList.remove('current');
  btnQueueInHeader.classList.add('current');
  if (
    localStorage.getItem(LOCALSTORAGE_QUEUE) === null ||
    JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE) === '[]')
  ) {
    // Скрывает кнопки, если библиотека пуста
    paginationDiv.classList.add('is-hidden');
    noResultDiv.classList.remove('is-hidden');
    //убираем фильтр
    clearFilter();
    return;
  }

  const savedQueueFilmsInLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

  /**
   * ВРЕМЕННОЕ РЕШЕНИЕ: фильтрация картинки
   */
  // const a = savedQueueFilmsInLocalStorage.map(film => {
  //   film.poster_path = `https://image.tmdb.org/t/p/original${film.poster_path}`;

  //   console.log(film, `gjhvjhv`);
  // });
  // console.log(a, `wowwo`);
  /**\
   * КОНЕЦ ВРЕМЕННОГО РЕШЕНИЯ
   */
  // cardList.innerHTML = cardForFilm(savedQueueFilmsInLocalStorage);
  // appendGalleryMarkup(savedQueueFilmsInLocalStorage);
  appendGalleryMarkup(savedQueueFilmsInLocalStorage.slice(0, 20));
  //Пагинация для фильмов в очереди
  paginationQueueFilms();
  //рисуем фильтр по жанрам
  filterQueue();
  noResultDivFilter.classList.add('is-hidden');
}
//убираем нотификацию при клике на кнопки
function showNotification() {
  console.log('Показываю предупреждение');
  notification.classList.add('is-hidden');
  // paginationDiv.classList.remove('is-hidden');
}