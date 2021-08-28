import gallery from '../templates/film-card.hbs'
import genres from './genres.json'
 import buttonOnclick from './trailers-movie'

const galleryContainer = document.querySelector('.film-card__list')
const noResultDiv = document.querySelector('.no-result')

export default function appendGalleryMarkup(filmResult) {

    noResultDiv.classList.add('is-hidden');
    const newGallery = filterGalleryProperty(filmResult)
    const markup = gallery(newGallery)

    galleryContainer.innerHTML = markup;
    buttonOnclick(filmResult)
   showRatingInLibrary(filmResult)
}

function filterGalleryProperty(filmResult) {

    const newGallery = filmResult.map(film => {
       

        filterForRealese(film)
        filterForGenres(film)
        return film;
    });
    return newGallery
}


function filterForRealese(film) {

    film.release_date = Number.parseInt(film.release_date)

}
function filterForGenres(film) {

    const sumGenres = [];
    if (film.genres) {

        if (film.genres.length === 0) {

            sumGenres.push('Others');
            film.genres = sumGenres.join(', ');
            return
        }

        const genresArray = film.genres.split(', ');

        const basicGenres = genresArray.slice(0, 3);

        const genresNames = genresArray.map(name => {

            if (sumGenres.length <= 2) {

                if (sumGenres.length === 2 && genresArray.length > basicGenres.length) {
                    sumGenres.push('Other')
                    return
                }
                sumGenres.push(name)
            }

        }

        );

        film.genres = sumGenres.join(', ');
        return;
    }
    if (film.genre_ids) {

        const newGenresId = film.genre_ids;
        const basicGenres = newGenresId.slice(0, 3);

        genres.map(genre => {
            if (basicGenres.includes(genre.id)) {
                getShortListGenres(sumGenres, newGenresId, basicGenres, genre.name)
            }
        })

        film.genres = sumGenres.join(', ');

    }

}

function getShortListGenres(sumGenres, newGenresId, basicGenres, genre) {

    if (sumGenres.length <= basicGenres.length) {

        if (sumGenres.length === 2 && newGenresId.length > basicGenres.length) {
            sumGenres.push('Others')
            return
        }
        sumGenres.push(genre)
    }
}

function showRatingInLibrary(filmResult) {
     if (!filmResult[0].genre_ids) {
      
    const rating = document.querySelector('.film-card__rating')

  for(let i = 0;i<galleryContainer.children.length;i++){
  
      const infoSet = galleryContainer.children[i].lastElementChild.children;
   
      for (let i = 0; i < infoSet.length; i++) {
    
          if (infoSet[i].classList.contains('film-card__rating')) {
              const rating = document.querySelector('.film-card__rating')
              infoSet[i].classList.remove('is-hidden')
          }
    }
      }  
  }
}




