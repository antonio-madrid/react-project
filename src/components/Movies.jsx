import Movie from './Movie'
import '../styles/movies.scss'
import {useSelector} from "react-redux";
import { movies} from "../data/selectors";

const Movies = ({ observedNode, viewTrailer, closeCard }) => {
    const movieLists = useSelector(movies)

    return (
        <div className="cardContainer" data-testid="movies">
            {movieLists?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
            <div ref={observedNode}></div>
        </div>
    )
}

export default Movies
