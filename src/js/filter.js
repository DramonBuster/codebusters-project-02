import appendGalleryMarkup from './drow-marckup';
import genres from './genres.json';
import getFilms from './fetch';
import { showPopularFilm } from './popular';
import { clearGallery } from './fetch-query';
import tplFilterPopular from '../templates/filter-popular.hbs';
import tplFilterQueue from '../templates/filter-library-queue.hbs';
import tplFilterWatched from '../templates/filter-library-watched.hbs';
import { onMadeWatchedGallery } from './modal';
import { onMadeQueueGallery } from './modal';
import { paginationFilterLibraryFilms,paginationFilterPopularFilms } from './pagination';

const noResultDiv = document.querySelector('.filter-message');
const paginationDiv = document.querySelector('.tui-pagination');
const noResultGenre = document.querySelector('.no-result__genre');
const loader = document.querySelector('.loader');

//создаем фильтр популярных фильмов
export function filterPopular() {
    clearFilter()
    const filter = document.querySelector('.filter');
    //рисуем новый фильтр
    const filterForPopular = tplFilterPopular();
    filter.insertAdjacentHTML('beforeend', filterForPopular);
    const genreFilterPopular = document.getElementById("filter-popular");
    //вешаем слушатель на фильтр
 
    genreFilterPopular.addEventListener("change", onSearchByGenrePopularFilms);
}

//поиск популярных фильмов по жанру
function onSearchByGenrePopularFilms() {
    const genreFilterPopular = document.getElementById("filter-popular");
    const filterNotification = document.querySelector('.filter__notification--popular');
    clearGallery();
       // console.log(loader)
    loader.classList.remove('is-hidden');
     console.log(loader)
    const genreInput = genreFilterPopular.value;
    if (genreInput === "Any") {
        filterNotification.classList.add('is-hidden');
        let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;
        showPopularFilm(queryParams);
        return;
    }
    const idGenre = genres.find(genre => genre.name === genreInput).id;
    localStorage.setItem('filterGenre', idGenre);
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${idGenre}`;
    getFilms(queryParams)
        .then(films => {
            const movies = films.total_results;
            localStorage.setItem('movies', movies);
            appendGalleryMarkup(films.results);
            loader.classList.add('is-hidden');
            paginationFilterPopularFilms();
     
        });
//    setTimeout(() => {
//        paginationFilterPopularFilms();
//    }, 300);
    filterNotification.textContent = `Popular movies in the genre of ${genreInput}`
    filterNotification.classList.remove('is-hidden');
}

//создаем фильтр фильмов в очереди
export function filterQueue() {
    clearFilter()
    noResultDiv.classList.add('is-hidden');
    const filter = document.querySelector('.filter');
    //рисуем новый фильтр
    const filterForLibraryQueue = tplFilterQueue();
    filter.insertAdjacentHTML('beforeend', filterForLibraryQueue);
    const genreFilterLibraryQueue = document.getElementById("filter-library-queue");
   // console.log("filter", genreFilterLibraryQueue)
    //вешаем слушатель на фильтр
    genreFilterLibraryQueue.addEventListener("change", onSearchByGenreQueueFilms);
}

//поиск фильмов в очереди по жанру
function onSearchByGenreQueueFilms() {
    const genreFilterLibraryQueue = document.getElementById("filter-library-queue");
    const filterNotification = document.querySelector('.filter__notification--library');
    clearGallery();
    loader.classList.remove('is-hidden');
    
    //получаем значение выбора в фильтре
    const genreInput = genreFilterLibraryQueue.value;
    if (genreInput === "Any") {
        onMadeQueueGallery();
        loader.classList.add('is-hidden');
    
        return;
    }
    //создаем новый массив фильмов, которые содержат нужный жанр
    let arrayForDraw = [];
    const queueFilms = JSON.parse(localStorage.queue);
    for (const film of queueFilms) {
        if (film.genres.includes(genreInput)) {
            arrayForDraw.push(film);
        }
    }
    //если фильмы по жанру не найдены
    if (arrayForDraw.length === 0) {
        filterNotification.classList.add('is-hidden');
        noResultGenre.textContent = `${genreInput}`;
        noResultDiv.classList.remove('is-hidden');
        paginationDiv.classList.add('is-hidden');
        loader.classList.add('is-hidden');
     
        return;
    } else {
        appendGalleryMarkup(arrayForDraw.slice(0, 20));
        loader.classList.add('is-hidden');
    
    }
    
    setTimeout(() => {
       paginationFilterLibraryFilms(arrayForDraw);
    }, 300);
    
    filterNotification.textContent = `Movies in the genre of ${genreInput}`
    filterNotification.classList.remove('is-hidden');
    
}

//создаем фильтр просмотренных фильмов
export function filterWatched() {
    clearFilter()
    noResultDiv.classList.add('is-hidden');
    const filter = document.querySelector('.filter');
    //рисуем новый фильтр
    const filterForLibraryWatched = tplFilterWatched();
    filter.insertAdjacentHTML('beforeend', filterForLibraryWatched);
    const genreFilterLibraryWatched = document.getElementById("filter-library-watched");
   // console.log("filter", genreFilterLibraryQueue)
    //вешаем слушатель на фильтр
    genreFilterLibraryWatched.addEventListener("change", onSearchByGenreWatchedFilms);
}

//поиск просмотренных фильмов по жанру
function onSearchByGenreWatchedFilms() {
    const genreFilterLibraryWatched = document.getElementById("filter-library-watched");
    const filterNotification = document.querySelector('.filter__notification--library');
    clearGallery();
    loader.classList.remove('is-hidden');
    
    //получаем значение выбора в фильтре
    const genreInput = genreFilterLibraryWatched.value;
    if (genreInput === "Any") {
        onMadeWatchedGallery();
        loader.classList.add('is-hidden');
   
        return;
    }
    //создаем новый массив фильмов, которые содержат нужный жанр
    let arrayForDraw = [];
    const watchedFilms = JSON.parse(localStorage.watched);
    for (const film of watchedFilms) {
        if (film.genres.includes(genreInput)) {
            arrayForDraw.push(film);
        }
    }
    //если фильмы по жанру не найдены
    if (arrayForDraw.length === 0) {
        filterNotification.classList.add('is-hidden');
        noResultGenre.textContent = `${genreInput}`;
        noResultDiv.classList.remove('is-hidden');
        paginationDiv.classList.add('is-hidden');
        loader.classList.add('is-hidden');
    
        return;
    } else {
        appendGalleryMarkup(arrayForDraw.slice(0, 20));
        loader.classList.add('is-hidden');
    }
    
    setTimeout(() => {
       paginationFilterLibraryFilms(arrayForDraw);
    }, 300);
    
    filterNotification.textContent = `Movies in the genre of ${genreInput}`
    filterNotification.classList.remove('is-hidden');
}

export function clearFilter() {
    const filter = document.querySelector('.filter');
    filter.innerHTML = ' ';
}