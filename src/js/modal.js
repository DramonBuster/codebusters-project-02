import getFilms from './fetch-popular';
import modalFilm from '../templates/modal.hbs';
import appendGalleryMarkup from './drow-marckup'
// import cardForFilm from '../templates/film-card.hbs';

let btnWachedInModal;
let btnQueueInModal;

const cards = document.querySelector('.film-card__list');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const LOCALSTORAGE_WATCHED = 'watched';
const LOCALSTORAGE_QUEUE = 'queue';

// Запуск библиотеки по кнопке MY LIBRUARY
const btnMyLibrary = document.querySelector('.library');
const cardList = document.querySelector('.film-card__list');
const libButtons = document.querySelector('.library-nav');
const form = document.querySelector('.form');

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

function onGetFilm(evt) {
  let queryParams = `movie/${evt.target.dataset.id}?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US`;

  getFilms(queryParams)
    .then(film => onModalMakeCard(film))
    .catch(error => console.log(error, 'ошибка!!!  что-то не так с запросом'));
}

function onModalMakeCard(openedFilm) {
  openedFilm.genres = openedFilm.genres.map(genre => genre.name).join(', ');

  const modalCard = modalFilm(openedFilm);

  modal.insertAdjacentHTML('afterbegin', modalCard);

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
  if (
    localStorage.length === 0 ||
    localStorage.getItem(LOCALSTORAGE_WATCHED) === '[]' ||
    localStorage.getItem(LOCALSTORAGE_QUEUE) === '[]'
  ) {
    return;
  }

  onSearchFilmInLocalStorageForChangeButtons(openedFilm);
}

function onSearchFilmInLocalStorageForChangeButtons(openedFilm) {
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
  if (btnQueueInHeader.classList.contains('current')) {
    onMadeQueueGallery();
    console.log('НАХОЖУСЬ в либе КУКУ и пытаюсь поменять карточки');
  } else if (btnWatchedInHeader.classList.contains('current')) {
    onMadeWatchedGallery();
    console.log('НАХОЖУСь в либе ВОТЧД и карточки меняю!!');
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

  // const queueFilmsFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));

  // Вешаем слушателей на кнопки и запускаем функцию отрисовки новой галереи
  btnWatchedInHeader.addEventListener('click', onMadeWatchedGallery);
  btnQueueInHeader.addEventListener('click', onMadeQueueGallery);
  onMadeQueueGallery();
});

function onMadeWatchedGallery() {
  cardList.innerHTML = '';

  btnQueueInHeader.classList.remove('current');
  btnWatchedInHeader.classList.add('current');
  if (
    localStorage.getItem(LOCALSTORAGE_WATCHED) === null ||
    JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED) === '[]')
  ) {
    // Нужно добавить красивое сообщение
    console.log('БИБЛИОТЕКА ВАТЧД ПУСТКАЯ!! НУЖНО ВЫБРАТЬ ФИЛЬМЫ');
    return;
  }

  console.log('отрисовываем ЛИБ ВОТЧД');
  // cardList.innerHTML = '';
  const savedWatchedFilmsInLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));

  /**
   * ВРЕМЕННОЕ РЕШЕНИЕ: фильтрация картинки
   */
  // const a = savedWatchedFilmsInLocalStorage.map(film => {
  //   film.poster_path = `https://image.tmdb.org/t/p/original${film.poster_path}`;

  //   console.log(film, `gjhvjhv`);
  // });
  // console.log(a, `wowwo`);
  appendGalleryMarkup(savedWatchedFilmsInLocalStorage);
  // cardList.innerHTML = cardForFilm(savedWatchedFilmsInLocalStorage);
}

function onMadeQueueGallery() {
  cardList.innerHTML = '';

  btnWatchedInHeader.classList.remove('current');
  btnQueueInHeader.classList.add('current');
  if (
    localStorage.getItem(LOCALSTORAGE_QUEUE) === null ||
    JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE) === '[]')
  ) {
    // Нужно добавить красивое сообщение
    console.log('БИБЛИОТЕКА КУКУ ПУСТКАЯ!! НУЖНО ВЫБРАТЬ ФИЛЬМЫ');
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
   appendGalleryMarkup(savedQueueFilmsInLocalStorage);
}
