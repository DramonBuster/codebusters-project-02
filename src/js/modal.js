//FT-17 По нажатию на карточку фильма на любой странице должна открываться модалка с динамически подставленной информацией о фильме
//FT-20 Реализовать закрытие модалки по нажатию на клавишу ESC и по клику вне области модалки, не забыть снять слушатели

import getFilms from './fetch-popular';
import modalFilm from '../templates/modal.hbs';
import { URL } from '../js/popular.js';
import genres from '../js/genres.json';

const cards = document.querySelector('.film-card__list');
const cardsArray = document.querySelectorAll('.film-card__item');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.button-close--size');
const body = document.querySelector('body');

// Работа с модальным окном - открытие и закрытие
cards.addEventListener('click', onModalOpen);

function onModalOpen(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  getFilms()
    .then(data => {
      return data.results;
    })
    .then(films => {
      const openedFilm = films.find(film => film.title === evt.target.alt);

      onModalMakeCard(openedFilm);
    })
    .catch(error => console.log(error));

  // модалка открыается пока только при нажатии на картинку

  backdrop.classList.remove('is-hidden');
  modal.classList.remove('is-hidden');
  body.classList.add('modal-open');

  backdrop.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onModalClose);
}

function onModalMakeCard(openedFilm) {
  //   console.log('делаю отрисовку карточки');
  //   console.log(genres);
  //   console.log(openedFilm.genre_ids);

  //   genres.forEach(genre => {
  //     console.log();
  //   });

  const filteredGenres = genres.filter(genre => {
    // console.log(genre.id);
    // console.log(openedFilm.genre_ids);
    return openedFilm.genre_ids.includes(genre.id);
  });

  const nedenGenres = filteredGenres.map(genre => genre.name).join(', ');

  openedFilm.genre_ids = nedenGenres;
  console.log(openedFilm.genre_ids);
  openedFilm.poster_path = URL + openedFilm.poster_path;
  const modalCard = modalFilm(openedFilm);
  modal.innerHTML = modalCard;
}

function onModalClose(evt) {
  console.log(evt.target.code);
  console.log(evt.target);
  console.log(evt.currentTarget);

  backdrop.classList.add('is-hidden');
  modal.classList.add('is-hidden');
  body.classList.remove('modal-open');

  modal.innerHTML = '';
}

// Заполение модального окна нужным контентом
