
import showPopularFilm from './popular';
import genres from'./genres.json';
const galleryContainer = document.querySelector('.film-card__list');

const add = document.querySelector('.selector');

add.addEventListener('change', onSerchFilms);

function onSerchFilms(e) {
    e.preventDefault();
    clearGallery();
    let currentTarget = add.value;
    const newTarget = searchForGenres(currentTarget);
    function searchForGenres() {
        const idGenreCurrentTarget = genres.find(genre => genre.name === currentTarget).id;
        return idGenreCurrentTarget;
    }
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${newTarget}`;
    showPopularFilm(queryParams);
}

function clearGallery() {
  galleryContainer.innerHTML = ' ';
}

function createGallery(queryCards) {
  appendGalleryMarkup(queryCards);
}


const yearTop = document.querySelector('.js-year-arrow-top');
const yearDown = document.querySelector('.js-year-arrow-down');
const voteTop = document.querySelector('.js-vote-arrow-top');
const voteDown = document.querySelector('.js-vote-arrow-down');

yearTop.addEventListener('click', onSerchFilmsYearTop);
yearDown.addEventListener('click', onSerchFilmsYearDown);
voteTop.addEventListener('click', onSerchFilmsVoteTop);
voteDown.addEventListener('click', onSerchFilmsVoteDown);

function onSerchFilmsYearTop(e) {
    e.preventDefault();
    clearGallery();
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&include_adult=false&include_video=false&page=1&sort_by=release_date.desc`;
    showPopularFilm(queryParams);
}

function onSerchFilmsYearDown(e) {
    e.preventDefault();
    clearGallery();
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&include_adult=false&include_video=false&page=1&sort_by=release_date.asc`;
    showPopularFilm(queryParams);
}

function onSerchFilmsVoteTop(e) {
    e.preventDefault();
    clearGallery();
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&include_adult=false&include_video=false&page=1&sort_by=vote_count.asc`;
    showPopularFilm(queryParams);
}

function onSerchFilmsVoteDown(e) {
    e.preventDefault();
    clearGallery();
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&include_adult=false&include_video=false&page=1&sort_by=vote_count.desc`;
    showPopularFilm(queryParams);
}




