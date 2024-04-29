import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
//URL DA API:https://api.themoviedb.org/3/movie/now_playing?api_key=830957551e0f953c5eeed21f2724fa15language=pt-BR


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;