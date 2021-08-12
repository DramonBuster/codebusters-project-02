import getFilms from './fetch-popular';
import modalFilm from '../templates/modal.hbs';

let btnWached;
let btnQueue;

const cards = document.querySelector('.film-card__list');
const cardsArray = document.querySelectorAll('.film-card__item');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const LOCALSTORAGE_WATCHED = 'watched';
const LOCALSTORAGE_QUEUE = 'queue';

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
    if (evt.code === 'Escape') onModalClose(evt);
  });
}

function onGetFilms(evt) {
  let queryParams = `movie/${evt.target.dataset.id}?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US`;

  getFilms(queryParams)
    .then(film => onModalMakeCard(film))
    .catch(error => console.log(error, 'ошибка!!!  что-то не так с запросом'));
}

function onModalMakeCard(openedFilm) {
  openedFilm.genres = openedFilm.genres.map(genre => genre.name).join(', ');

  const modalCard = modalFilm(openedFilm);

  modal.insertAdjacentHTML('afterbegin', modalCard);

  btnWached = document.querySelector('.watched');
  btnQueue = document.querySelector('.queue');

  const btnModalClose = document.querySelector('.button-close');
  btnModalClose.addEventListener('click', onModalClose);

  //пробные данные для ЛС
  // localStr.push(openedFilm);
  // localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify(localStr));

  onCheckLocalStorage(openedFilm);

  btnWached.addEventListener('click', evt => {
    onAddRemoveWached(evt, openedFilm);
  });

  btnQueue.addEventListener('click', evt => {
    onAddRemoveQueue(evt, openedFilm);
  });
}

function onCheckLocalStorage(openedFilm) {
  if (localStorage.length === 0 || localStorage.getItem(LOCALSTORAGE_WATCHED) === '[]') {
    return;
  }

  onSearchFilmInLocalStorage(openedFilm);
}

function onSearchFilmInLocalStorage(openedFilm) {
  const savedWachedFilms = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

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

    const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

    const modifiedSavedFilms = filmsFromLocalStorage.filter(
      filmFromLocalStorage => filmFromLocalStorage.id !== openedFilm.id,
    );

    localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify(modifiedSavedFilms));

    // onRemoveFilmFromLocalStorage(); Вынести удаление в отдельную функцию? как в конспекте
  } else {
    btnWached.textContent = 'remove from watched';
    btnWached.dataset.action = 'remove';

    if (localStorage.getItem(LOCALSTORAGE_WATCHED) === null) {
      localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify([openedFilm]));
    } else {
      const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

      filmsFromLocalStorage.push(openedFilm);

      localStorage.setItem(LOCALSTORAGE_WATCHED, JSON.stringify(filmsFromLocalStorage));
    }

    // onAddFilmToLocalStorage(); вынести добавление в отдельную функцию?
  }
}

function onAddRemoveQueue(evt, openedFilm) {
  if (evt.target.dataset.action === 'remove') {
    btnQueue.textContent = 'add to queue';
    btnQueue.dataset.action = 'add';

    const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

    const modifiedSavedFilms = filmsFromLocalStorage.filter(
      filmFromLocalStorage => filmFromLocalStorage.id !== openedFilm.id,
    );

    localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify(modifiedSavedFilms));

    // onRemoveFilmFromLocalStorage(); Вынести удаление в отдельную функцию? как в конспекте
  } else {
    btnQueue.textContent = 'remove from queue';
    btnQueue.dataset.action = 'remove';

    if (localStorage.getItem(LOCALSTORAGE_QUEUE) === null) {
      localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify([openedFilm]));
    } else {
      const filmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

      filmsFromLocalStorage.push(openedFilm);

      localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify(filmsFromLocalStorage));
    }

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
