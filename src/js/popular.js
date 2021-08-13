//FT-07 Реализовать подгрузку популярных фильмов на главную (первую) страницу

import getFilms from './fetch-popular'
// import AxiosApi from './fetch-popular'
import gallery from '../templates/film-card.hbs'
import genres from './genres.json'
import appendGalleryMarkup from './drow-marckup'



const logoLink = document.querySelector('.logo__link')
const buttonHome = document.querySelector('.page-header__btn')
const buttonsLibrary = document.querySelector('.library-nav')
const form = document.querySelector('.form')
const headerImg = document.querySelector('.page-header')
const btnMyLibrary = document.querySelector('.library');
const btnHome = document.querySelector('.home');

 let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;

//слушатель на кнопке
buttonHome.addEventListener('click', () => {
        headerImg.classList.remove('library-header')
    headerImg.classList.add('page-header')
    buttonsLibrary.classList.add('is-hidden');
    form.classList.remove('is-hidden');
    showPopularFilm(queryParams)
    // changeMainThemeHeader();
})
 //слушатель на ссылке
logoLink.addEventListener('click', () => {
    headerImg.classList.remove('library-header')
    headerImg.classList.add('page-header')
     buttonsLibrary.classList.add('is-hidden');
    form.classList.remove('is-hidden');
     showPopularFilm(queryParams)
     changeMainThemeHeader();
 })

 
function showPopularFilm(queryParams) {
    changeMainThemeHeader();
    getFilms(queryParams).then(films => {
        const totalResult = films.results;
        const pages = films.total_pages;
        console.log(pages, `всего страниц для пагинации`)
        appendGalleryMarkup(totalResult)
 }).catch(error => console.log(error))
}

function changeMainThemeHeader() {
    headerImg.classList.remove('library-header');
    buttonsLibrary.classList.add('is-hidden');
    form.classList.remove('is-hidden');
    btnMyLibrary.classList.remove('current');
    btnHome.classList.add('current');
}



showPopularFilm(queryParams);




// /**
//  * классы закоммичены
//  */
// const axiosApiService = new AxiosApi();
// function showPopularFilm() {
//     axiosApiService.getFilms().then(films => {
       
//         const totalResult = films.results;
//         const pages = films.total_pages;
//         console.log(genres, `это данные json с жанрами`)
//         console.log(pages, `всего страниц для пагинации`)
//         console.log(totalResult[0].genre_ids, `пример массива с айпишниками, которые приходят в разделе жанры`)
//         appendGalleryMarkup(totalResult)
//  }).catch(error => console.log(error))
// }
// showPopularFilm()


// const input = document.querySelector('.form__input');
// console.log(input)

// input.addEventListener('input', onSearch)

// function onSearch(evt) {
//     evt.preventDefault()

//      console.dir(evt.currentTarget.value)
//     //  clearGallery()
//     const currentValue = evt.currentTarget.value.trim();
   
//  // через форму добираемся до инпута по его имени searchQuery делаем потому что  refs.input.value при модульном хранении файлов не работает
//     if (currentValue === '') {
//          showPopularFilm()
//          return;
//      }
//      axiosApiService.query(evt.currentTarget.value)
//     axiosApiService.searchFilms().then( films => {
//          console.log(films, `FGHKJLGFUDKYTDHKGFIGDHK`)
//         const totalResult = films.results;
//         console.log(films.results)
//         clearGallery()
        
//         // if (films.length !== 0) {
//         //     return
//         // }
//        appendGalleryMarkup(films.results)
    
//     }).catch(error => console.log(error))
// }

// function clearGallery() {
//     galleryContainer.innerHTML = '';
// };



