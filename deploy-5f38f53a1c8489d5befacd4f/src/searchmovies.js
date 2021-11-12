import React, {useState} from 'react'
import MovieCard from './MovieCard'
import './style.css'

export default function SearchMovies() {

    const [query,setQuery] = useState('');
    const [movies,setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault()
        const url= `https://api.themoviedb.org/3/search/movie?api_key=4c96a241d7e615703787523e49b3bc2d&query=${query}&include_adult=false`;

        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    console.log(movies)

    return(
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">
                    <input className="input" 
                        type="text" 
                        name="query" 
                        placeholder="Enter a movie/actor"
                        value={query}
                        onChange = {(e) => setQuery(e.target.value)}
                        />
                    <button class="button" type="submit">
                        Search
                    </button>
                </label>
            </form>

            <div className="card-list">
                {movies.map(movie => 
                    <MovieCard movie={movie} key={movie.id}/>
                    )}
            </div>
        </>
    )
}