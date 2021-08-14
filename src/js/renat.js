import getFilms from './fetch-popular'
 
const galleryContainer = document.querySelector('.film-card__list')
const modal = document.querySelector('.modal')


export default function buttonOnclick(filmResult) {
// const traillerButton = window.querySelector('.film-card__trailler')
console.log(filmResult)

galleryContainer.addEventListener('click', openModalMovie);
}

function openModalMovie(evt) {

    const events = evt.target;
    
    if (evt.target.classList.contains('film-card__trailler')) {
        console.log(modal, `modal1`);
        // modal.classList.toggle('is-hidden');
        console.log(modal, `modal2`)
        let queryParams = `movie/${evt.target.dataset.movie}/videos?api_key=27c4b211807350ab60580c41abf1bb8c`;

        fetchTraillerFilm(queryParams)
        return;
      }
   
}
function fetchTraillerFilm(queryParams) {
    getFilms(queryParams).then(film => {
        
        console.log(film, `мой массив`)
        const trailers = film.results;
          
        putTrailerInModal(trailers)
    
    } )

    
}
function putTrailerInModal(trailers) {
    console.log(trailers, `gjhfkhfjhflh`)
 const trailerFilm = trailers.find(trailer => {
          
            if (trailer.name.includes('Official') && trailer.name.includes('Trailer')) {
               return trailer.key;
            } else if(trailer.name.includes('Trailer')) {
               return trailer.key;
            } 
        
 })
  appendModalMarckup(trailerFilm)
}
function appendModalMarckup(trailerFilm) {
   
     modal.classList.toggle('is-hidden');
    const trailerKey = trailerFilm.key;
    
     modal.innerHTML = ` <div class="modal__trailler"><iframe width="854" height="480" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
     closeModal() 
}
function closeModal(evt) {
// if(evt.target !== )
    window.addEventListener('click', yfjfk)
  
}
function yfjfk(evt) {
         console.log(evt.target)
        if (evt.target.classList.contains('modal')) {
            return;
        }
      dddd()

}
function dddd() {
    aqqqq()
    
}

function aqqqq() {
     modal.classList.add('is-hidden')
    modal.innerHTML = '';
  console.log(modal)
    // window.removeEventListener('click', (evt) => {
    //     console.log(evt.target)
    //     if (evt.target.classList.contains('modal')) {
    //         return;
    //     }
    //   dddd()
      
    // })
   
    return
}