import noPhotoImage from '../assets/no-image.jpg';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
        {props.movies.map( (movie, index) => ( 
            <div className="image-container col mb-4">
                <div className="row text-center">
                    <div className="heading">
                        <h4>{movie.Title}</h4>
                    </div>
                    <img className="img-fluid text-center"
                         src={movie.Poster === "N/A" ? noPhotoImage : movie.Poster} alt="movie" />
                    <div
                    onClick={() => props.handleFavouriteClick(movie)}
                    className="overlay d-flex align-items-center
                    justify-content-center">
                        <FavouriteComponent />

                    </div>
                </div>
            </div>
        ))

        }
        </>
    )
}

export default MovieList;