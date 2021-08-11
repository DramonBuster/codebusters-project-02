import getFilms from './fetch-popular';
import modalFilm from '../templates/modal.hbs';
// import { URL } from '../js/popular.js';
import genres from '../js/genres.json';

let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;
let localStr = [];
let btnWached;
let idForAddRemoveFilmFromLocalStorage;

const cards = document.querySelector('.film-card__list');
const cardsArray = document.querySelectorAll('.film-card__item');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const LOCALSTORAGE_KEY = 'watched';

// Работа с модальным окном - открытие и закрытие
cards.addEventListener('click', onModalOpen);

function onModalOpen(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  onGetFilms(evt);

  backdrop.classList.remove('is-hidden');
  modal.classList.remove('is-hidden');
  body.classList.add('modal-open');

  backdrop.addEventListener('click', evt => {
    if (!evt.target.classList.contains('backdrop')) {
      return;
    }
    onModalClose(evt);
  });

  window.addEventListener('keydown', evt => {
    // console.log(evt.code);
    if (evt.code === 'Escape') {
      onModalClose(evt);
    }
  });
}

function onGetFilms(evt) {
  getFilms(queryParams)
    .then(data => {
      return data.results;
    })
    .then(films => {
      // const openedFilm = films.find(film => film.title === evt.target.alt);
      // Переделать под
      const openedFilm = films.find(film => film.id === Number(evt.target.getAttribute('data-id')));

      onModalMakeCard(openedFilm);
      // return;
    })
    .catch(error => console.log(error, 'ошибка!!!  что-то не так с запросом'));
}

function onModalMakeCard(openedFilm) {
  const filteredGenres = genres.filter(genre => {
    return openedFilm.genre_ids.includes(genre.id);
  });

  const nedenGenres = filteredGenres.map(genre => genre.name).join(', ');

  openedFilm.genre_ids = nedenGenres;
  openedFilm.poster_path = openedFilm.poster_path;
  const modalCard = modalFilm(openedFilm);

  modal.insertAdjacentHTML('afterbegin', modalCard);

  btnWached = document.querySelector('.watched');

  const btnModalClose = document.querySelector('.button-close');
  btnModalClose.addEventListener('click', onModalClose);

  //пробные данные для ЛС
  // localStr.push(openedFilm);
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localStr));

  // проверяем на наличие данных в ЛС
  idForAddRemoveFilmFromLocalStorage = openedFilm.id;
  onCheckLocalStorage(openedFilm);

  btnWached.addEventListener('click', evt => {
    onAddRemoveWached(evt, openedFilm);
  });
}

function onCheckLocalStorage(openedFilm) {
  if (localStorage.length === 0 || localStorage.getItem(LOCALSTORAGE_KEY) === '[]') {
    return;
  }

  onSearchFilmInLocalStorage(openedFilm);
}

function onSearchFilmInLocalStorage(openedFilm) {
  // console.log(openedFilm.id);

  const savedWachedFilms = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  savedWachedFilms.forEach(savedWachedFilm => {
    if (openedFilm.id !== Number(savedWachedFilm.id)) {
      return;
    }
    btnWached.textContent = 'remove from watched';
    btnWached.dataset.action = 'remove';
  });
}

function onAddRemoveWached(evt, openedFilm) {
  if (evt.target.dataset.action === 'remove') {
    btnWached.textContent = 'add to watched';
    btnWached.dataset.action = 'add';

    const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    const modifiedSavedFilms = filmsFromLocalStorage.filter(
      filmFromLocalStorage => filmFromLocalStorage.id !== idForAddRemoveFilmFromLocalStorage,
    );

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(modifiedSavedFilms));

    // onRemoveFilmFromLocalStorage(); Вынести удаление в отдельную функцию? как в конспекте
  } else {
    btnWached.textContent = 'remove from watched';
    btnWached.dataset.action = 'remove';

    const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    filmsFromLocalStorage.push(openedFilm);

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filmsFromLocalStorage));

    // onAddFilmToLocalStorage(); вынести добавление в отдельную функцию?
  }
}

function onRemoveFilmFromLocalStorage() {
  console.log();
}

function onAddFilmToLocalStorage() {
  console.log();
}

function onModalClose(evt) {
  // console.log(evt.code);
  // console.log(evt.target);
  // console.log(evt.currentTarget);
  // console.log(evt.target.classList.contains('backdrop'));

  backdrop.classList.add('is-hidden');
  modal.classList.add('is-hidden');
  body.classList.remove('modal-open');

  modal.innerHTML = '';
}

// Заполение модального окна нужным контентом
