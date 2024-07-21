import {API_KEY, ENDPOINT} from "../constants";
import { useState} from "react";

export const useRequestTrailers = () => {
    const [trailerKey, setTrailerKey] = useState()
    const [isTrailerModalActive, setIsTrailerModalActive] = useState(false);

    /** This real call to the API result is not a global value, it is not needed to keep it in Redux store */
    const getTrailer = async (id) => {
        setTrailerKey(null)

        const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        const trailerData = await fetch(URL)
            .then((response) => response.json())


        if (trailerData.videos && trailerData.videos.results.length) {
            const trailer = trailerData.videos.results.find(vid => vid.type === 'Trailer')
            await setTrailerKey(trailer ? trailer.key : trailerData.videos.results[0].key)
        }
    }

    /** Function which triggers the Trailer modal */
    const viewTrailer = async (movie) => {
        await getTrailer(movie.id)
        setIsTrailerModalActive(true);
    }

    return {
        viewTrailer,
        trailerKey,
        isTrailerModalActive
    }
}