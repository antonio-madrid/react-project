import { Routes, Route} from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import './app.scss'
import {API_KEY, ENDPOINT} from "./constants";
import {useState} from "react";
import {useRequestMovies} from "./hooks/useRequestMovies";
import {useSelector} from "react-redux";
import {movies} from "./data/selectors";

const App = () => {
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  const closeCard = null;

  // Avoid multiple requests to the API
  const {searchMovies, observedNode} = useRequestMovies();

  return (
      <div className="App">
        <Header searchMovies={searchMovies} />

        <div className="container">
          {/*{videoKey ? (*/}
          {/*    <YouTubePlayer*/}
          {/*        videoKey={videoKey}*/}
          {/*    />*/}
          {/*) : (*/}
          {/*    <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>*/}
          {/*)}*/}

          <Routes>
            <Route path="/" element={<Movies observedNode={observedNode} viewTrailer={() => {}} closeCard={null}/>}/>
            <Route path="/starred" element={<Starred viewTrailer={viewTrailer}/>}/>
            <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer}/>}/>
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>}/>
          </Routes>
        </div>
      </div>
  )
}

export default App
