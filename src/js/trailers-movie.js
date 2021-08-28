import getFilms from './fetch'
 
const galleryContainer = document.querySelector('.film-card__list')
const modal = document.querySelector('.modal')
const backdrop = document.querySelector('.backdrop')
const body = document.querySelector('body');
let btn = document.querySelector('#toTop');

export default function buttonOnclick(filmResult) {



    galleryContainer.addEventListener('click', openModalMovie);
}

function showTexNoResulttButton(id) {

    for (let i = 0; i < galleryContainer.children.length; i++) {
       
          if (galleryContainer.children[i].dataset.id === id) {
         
              const infoSet = galleryContainer.children[i].children;
         
              for (let i = 0; i < infoSet.length; i++) {
              
                  if (infoSet[i].classList.contains('film-card__info')) {
                 
                      const arrayInfo = infoSet[i];
                        for (let i = 0; i < arrayInfo.children.length; i++) {
                  
                            if (arrayInfo.children[i].classList.contains('film-card__trailler')) {
                    
                              const trailerbtn = arrayInfo.children[i];
                               trailerbtn.classList.add('no-result')
                            }
                        }
                }
            }
    }
          }
}

function openModalMovie(evt) {
 
    const events = evt.target;
     const currentId = evt.target.dataset.movie;
  
      
    if (evt.target.classList.contains('film-card__trailler')) {
    
        let queryParams = `movie/${evt.target.dataset.movie}/videos?api_key=27c4b211807350ab60580c41abf1bb8c`;
        fetchTraillerFilm(queryParams, currentId)
        return;
      }
   
}
function fetchTraillerFilm(queryParams, currentId) {
    getFilms(queryParams).then(film => {
       
        const trailers = film.results;
      
        putTrailerInModal(trailers, currentId)
    
    }).catch(error => {
        console.log(error)
       
    })

    
}
function putTrailerInModal(trailers, currentId) {
  
    if (trailers.length === 0) {
     
         showTexNoResulttButton(currentId)
        return
    }
 let trailerFilm = trailers.find(trailer => {
 
     trailer.name = trailer.name.toLowerCase()
    
     if (trailer.name.includes('official') && trailer.name.includes('trailer')) {
              
               return trailer.key;
     } else if (trailer.name.includes('trailer')) {
        
               return trailer.key;
     }
    
     if (trailers.length === 1) {
          console.log(`мало огня`)
         return trailers[0];
     }
     
        
 })
    //   if (!trailerFilm) {
    //    if (trailers.length > 1) {
    //        console.log(`мало огня`, trailers[0] )
    //        trailerFilm = trailers[0];
    //  }
    // }
    if (!trailerFilm) {
       
        showTexNoResulttButton(currentId)
        return
    }
  
  appendModalMarckup(trailerFilm)
}
function appendModalMarckup(trailerFilm) {
    btn.classList.remove('show');
    body.classList.add('modal-open');
    modal.classList.remove('is-hidden');
    backdrop.classList.remove('is-hidden');
    
    const trailerKey = trailerFilm.key;
    console.log(trailerKey, `key`)
    
     modal.innerHTML = ` <div class="modal__trailer"><iframe class="modal__frame"  src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>   <button class='button-close' data-modal-close>
  </button>`;
  
     window.addEventListener('click', closeModal)
}
function closeModal(evt) {
        
      if (evt.target.classList.contains('modal')) {
            return;
      }
     if (evt.target.nodeName === 'IMG') {
    return;
  }
    if (evt.target.classList.contains('queue') || evt.target.classList.contains('watched')) {
        return
    }
    if (modal.classList.contains('is-hidden')) {
         modal.classList.add('is-hidden')
        backdrop.classList.add('is-hidden');
         body.classList.remove('modal-open');
      
        modal.innerHTML = ''; 
    }
      modal.classList.add('is-hidden')
      backdrop.classList.add('is-hidden')
        body.classList.remove('modal-open');
      modal.innerHTML = ''; 

   
    return;
  
}