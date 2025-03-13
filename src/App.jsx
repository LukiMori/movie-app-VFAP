import React, {useState, useEffect} from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from './components/MovieListHeading';
import MovieList from './components/MovieList';
import addFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';
import SearchBox from "./components/SearchBox";
import removeFavourite from "./components/RemoveFavourite";

function App() {
    const [searchValue, setSearchValue] = useState('');
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f2708174`;
        const movieResponse = await fetch(url);
        const movieResponseJson = await movieResponse.json();
        if (movieResponseJson.Search) {
            setMovies(movieResponseJson.Search);
        }

    }

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    // Stringify - konverze JS objektu na string
    const saveToLocalStorage = (items) => {
        localStorage.setItem('movie-app-favourites', JSON.stringify(items));
    }

    const addFavouriteMovie = (movie) => {
        if (favourites.includes(movie)) {
            alert('Film už je v oblíbených.');
        } else {
            const newFavouriteList = [...favourites, movie];
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
        }
    }

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter((favourite) => favourite.imDB !== movie.imDB);
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    }



  return (
    <div className="container overflow-hidden">
        <div className="row mt-4 mb-4">
            <MovieListHeading heading="Oblíbené filmy"></MovieListHeading>
        </div>
        <div className="row row-cols-3">
            <MovieList movies={favourites} handleFavouriteClick={removeFavouriteMovie} favouriteComponent={removeFavourite}></MovieList>
        </div>
      <div className="row mt-4 mb-4">
        <MovieListHeading heading="Seznam filmů"></MovieListHeading>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row row-cols-3">
          <MovieList movies={movies} handleFavouriteClick={addFavouriteMovie} favouriteComponent={addFavourite}></MovieList>
      </div>
    </div>
  )
}

export default App
