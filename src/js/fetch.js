import axios from 'axios';
//import "regenerator-runtime";
const BASE_URL = 'https://api.themoviedb.org/3/';
axios.defaults.baseURL = BASE_URL;
const API_KEY = '27c4b211807350ab60580c41abf1bb8c';

//значение переменной queryParams надо указывать в функции, которая будет отвечать
//в слушателе событий за нужный поиск/запрос

//функция запроса - асинхронный код
async function getFilms(queryParams) {
  let url = BASE_URL + queryParams;
  try {
    const response = await axios.get(url);
    //получаем массив объектов
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

export default getFilms;

//ЗАПРОСЫ
//поиск по ключевому слову
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false&query=

//популярные фильмы за неделю
//https://api.themoviedb.org/3/trending/movie/week?api_key=<<api_key>>

//полное описание фильма
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
