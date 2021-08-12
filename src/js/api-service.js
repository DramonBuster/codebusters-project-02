//FT-08 Сверстать или подключить номера страниц (пагинация) на главной странице
//FT-09 При переходе на каждую страницу отрисосывать соответствующую часть фильмов
//FT-10 Реализовать поиск и отрисовку фильмов по ключевому слову

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
axios.defaults.baseURL = BASE_URL;
const API_KEY = "27c4b211807350ab60580c41abf1bb8c";

export default class FilmsApiService {

    constructor() {
        this.querySearch = '';
        this.page = 1;
        // this.queryParams = `trending/movie/week?api_key=${API_KEY}&page=${this.page}`;
    }
        
    
    //метод отвечает за все http запросы
    async getFilms() {
        let params = `trending/movie/week?api_key=${API_KEY}&page=${this.page}`;
        let url = BASE_URL + params;
      
        try {
             console.log(url, `URL`)
        const response = await axios.get(url);
        const data = response.data;
        console.log("результат запроса:",data);
        //массив объектов - популярные фильмы
        const film = data.results;
        console.log("массив объектов:", film);
        const totalResults = data.total_results;
        console.log("всего найдено фильмов:", totalResults);
        return data;
        } catch(error) {
                throw(error)
            }
    }
    
    async searchFilms() {
        let queryParams =  `search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.querySearch}`;
         let url = BASE_URL + queryParams;
       try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
        } catch(error) {
                throw(error)
            }
      }
    
    async searchFilmAbout() {
        let queryParams = `movie/{movie_id}?api_key=${API_KEY}&language=en-US&page=${this.page}`;
         let url = BASE_URL + queryParams;
       try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
        } catch(error) {
                throw(error)
            }
    }

    incrementPage() {
        this.page += 1;
        console.log(this.page);
    }
    
    resetPage() {
      return  this.page = 1;
    }

    query(newQuery) {
        console.log(newQuery, `welcome `)
        
        // console.log(this.queryParams)
        this.querySearch = newQuery;
    
        console.log(this.url)
    }

    newPage(currentPage) {  
        this.page = currentPage;
    }
}
