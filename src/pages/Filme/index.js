import { useEffect,useState } from "react";
import{useParams,useNavigate } from 'react-router-dom';
import api from "../../services/api";
import './filme-info.css';
import {toast} from 'react-toastify';

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();



    const [filme,setFilme] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:'830957551e0f953c5eeed21f2724fa15',
                    language:'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('FILME NAO ENCONTRADO');
                navigate('/', { replace:true });
                return;
            })
        }
        loadFilme();

        return() => {
            console.log('COMPONENTE FOI DESMONTADO');
        }
    },[navigate,id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');

        let filmessalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmessalvos.some((filmessalvo)=> filmessalvo.id === filme.id)
        if(hasFilme){
            toast.warn('Esse filme já está na sua lista')
            return;
        }

        filmessalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmessalvos));
        toast.success('filme salvo com sucesso!')
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação:{filme.vote_average} /10</strong>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;
