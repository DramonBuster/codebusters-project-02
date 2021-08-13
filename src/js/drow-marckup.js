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

 
        const genresArray = film.genres.map(genre => genre.name);

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

    const newGenresId = film.genre_ids;
    const basicGenres = newGenresId.slice(0, 3);

      genres.map(genre => {
         if (basicGenres.includes(genre.id)) {
               getShortListGenres(sumGenres, newGenresId, basicGenres, genre.name)
            }
     })
 
    film.genres = sumGenres.join(', ');
    
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




/**
 * ПЕРЕД РЕФАКТОРИНГОМ
 */
//  import gallery from '../templates/film-card.hbs'
//  import genres from './genres.json'

// const galleryContainer = document.querySelector('.film-card__list')

// export default function appendGalleryMarkup(filmResult) {
  
//     const newGallery = filterGalleryProperty(filmResult)
//     const markup = gallery(newGallery)

//     galleryContainer.innerHTML = markup;
// }

// function filterGalleryProperty(filmResult) {

//     const newGallery = filmResult.map(film => {
//         filterForRealese(film)
//         filterForGenres(film)
//         // filterForPosters(film)
//           return film;
//    });
//     return newGallery
// }

// // function filterForPosters(film) {
// //       if (film.poster_path === null) {
// //         //   film.poster_path = `https://i.ibb.co/HxmtdsL/viber-2021-08-12-15-51-44-146.jpg`
            
// //        } else {
// //             // film.poster_path = `https://image.tmdb.org/t/p/original${film.poster_path}`
// //        }
      
// // }
// function filterForRealese(film) {
//     film.release_date = Number.parseInt(film.release_date) 
//     //      if (film.release_date == "") {
//     //        film.release_date = 'n/a';
//     //    } else  {
//     //        film.release_date = Number.parseInt(film.release_date) 
//     //    }
//  }
// function filterForGenres(film) {

//      const sumGenres = [];
//     if (film.genres) {
        
//     //          if (film.genres.length === 0) {
              
//     //              sumGenres.push('Others');
//     //               film.genres = sumGenres.join(', ');
//     //              return
//     //    }
        
//         const genresArray = film.genres.map(genre => genre.name);

//                  const basicGenres = genresArray.slice(0, 3);
  
//         const genresNames = genresArray.map(name => {
            
//             if (sumGenres.length <= 2) {
               
//                 if (sumGenres.length === 2 && genresArray.length > basicGenres.length) {
//                     sumGenres.push('Other')
//                     return
//                 }
//                 sumGenres.push(name)
//             }
//         }

//         );

//             film.genres = sumGenres.join(', ');
//             return;
//     }

//     const newGenresId = film.genre_ids;
//     const basicGenres = newGenresId.slice(0, 3);

//     //    if (newGenresId.length === 0) {
          
//     //        sumGenres.push('Others');
//     // };
//       genres.map(genre => {
//          if (basicGenres.includes(genre.id)) {
//                getShortListGenres(sumGenres, newGenresId, basicGenres, genre.name)
//             }
//      })
 
//     film.genres = sumGenres.join(', ');
    
// }

// function getShortListGenres(sumGenres, newGenresId, basicGenres, genre) {

//           if (sumGenres.length <= basicGenres.length) {
                  
//                     if (sumGenres.length === 2 && newGenresId.length > basicGenres.length) {
//                         sumGenres.push('Others')
//                         return
//                     }
//                     sumGenres.push(genre)
//     }  
// }