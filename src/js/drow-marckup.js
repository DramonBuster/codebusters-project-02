 import gallery from '../templates/film-card.hbs'
 import genres from './genres.json'

const galleryContainer = document.querySelector('.film-card__list')

export default function appendGalleryMarkup(filmResult) {
  
    const newGallery = filterGalleryProperty(filmResult)
    const markup = gallery(newGallery)

    galleryContainer.innerHTML = markup;

}


function filterGalleryProperty(filmResult) {
    
   const newGallery = filmResult.map(film => {
    
       
        filterForRealese(film)
       
       console.log(film, `object`)
        
    //    console.log(newGenres)
    
    
       filterForGenres(film)
      
       filterForPosters(film)
       
      
        return film;
   });
    return newGallery
}
function filterForPosters(film) {
      if (film.poster_path === null) {
           film.poster_path = `https://www.begindot.com/wp-content/uploads/2019/01/Best-Coming-Soon-HTML-Templates.jpg`;
        //   film.poster_path = `../images/Soon.jpg`;
            console.log(`ooops`)
       } else {
            film.poster_path = `https://image.tmdb.org/t/p/original${film.poster_path}`
       }
      
}
function filterForRealese(film) {
         if (film.release_date == "") {
           
           film.release_date = 'n/a';
       } else  {
           film.release_date = Number.parseInt(film.release_date) 
       }
 }
function filterForGenres(film) {

    const newGenres = film.genre_ids;
    const basicGenres = newGenres.slice(0, 3);
    const othersGenres = newGenres.slice(3);
    const sumGenres = [];
    
       if (newGenres.length === 0) {
          
           sumGenres.push('Others');
       }
     genres.map(genre => {
            if (basicGenres.includes(genre.id)) {
                if (sumGenres.length <= basicGenres.length) {
                    
                    if (sumGenres.length === 2 && newGenres.length > basicGenres.length) {
                        // sumGenres.push(genre.name)
                        sumGenres.push('Others')
                        return
                    }
                    sumGenres.push(genre.name)
                }
            }
     })
     film.genre_ids = sumGenres.join(', ');
}






/**
 * Варианты реалзизации поиска
 */
//  function appendGalleryMarkup(filmResult) {
//     console.log(`ПОпали в отрисовку`)
//     const newGallery = filmResult.map(film => {
        
//         film.release_date = Number.parseInt(film.release_date)

//         const newGenres = film.genre_ids;
//         // базовые жанры для вывода 
//         const basicGenres = newGenres.slice(0, 3);
//         // console.log(basicGenres, `базовые жанры`)
//         // необходимы будут, если необходимо открыть все жанры при клике на жанры в карточке
//         const othersGenres = newGenres.slice(3);
//         // console.log(othersGenres,  `остальные`)
//         const sumGenres = [];
// //    console.log(newGenres)
//         //    for (let i = 0; i <= newGenres.length; i++) {
     
//         //      genres.find( ganre => {
            
//         //         if (ganre.id === newGenres[i] && sumGenres.length <=2 ) {
//         //             sumGenres.push(ganre.name)
//         //         } else if (ganre.id === newGenres[i] && sumGenres.length === 3) {
//         //              sumGenres.push('Others')
//         //         }
//         //     });
            
//         //     film.genre_ids = sumGenres.join(', ');
//         // }
//         genres.map(genre => {
//             if (basicGenres.includes(genre.id)) {
//                 if (sumGenres.length <= basicGenres.length) {
                    
//                     if (sumGenres.length === 2 && newGenres.length > basicGenres.length) {
//                         sumGenres.push(genre.name)
//                         sumGenres.push('Others')
//                         return
//                     }
//                     sumGenres.push(genre.name)
//                 }
//             }
//         } )
//     film.genre_ids = sumGenres.join(', ');
 
//         return film;
//     });

//     const markup = gallery(newGallery)
//     galleryContainer.innerHTML = markup;

// }