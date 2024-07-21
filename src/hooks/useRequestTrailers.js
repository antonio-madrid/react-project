import {API_KEY, ENDPOINT} from "../constants";
import { useState} from "react";

export const useRequestTrailers = () => {
    const [videoKey, setVideoKey] = useState()
    const [isTrailerModalActive, setIsTrailerModalActive] = useState(false);

    const viewTrailer = async (movie) => {
        await getMovie(movie.id)
        setIsTrailerModalActive(true);
    }

    const getMovie = async (id) => {
        const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

        setVideoKey(null)
        const videoData = await fetch(URL)
            .then((response) => response.json())

        if (videoData.videos && videoData.videos.results.length) {
            const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
            await setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
        }
    }

    return {
        viewTrailer,
        videoKey,
        isTrailerModalActive
    }
}