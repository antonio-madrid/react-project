import { Routes, Route} from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import './app.scss'
import {useRequestMovies} from "./hooks/useRequestMovies";
import TrailerModal from "./components/TrailerModal";
import {useRequestTrailers} from "./hooks/useRequestTrailers";

const App = () => {
  // Avoid multiple requests to the API
  const {searchMovies, observedNode} = useRequestMovies();


  const { viewTrailer, videoKey, isTrailerModalActive } = useRequestTrailers();


  return (
      <div className="App">
        <Header searchMovies={searchMovies} />

        <div className="container">
          {isTrailerModalActive ? <TrailerModal videoKey={videoKey}></TrailerModal> : null}

          <Routes>
            <Route path="/" element={<Movies observedNode={observedNode} viewTrailer={viewTrailer} closeCard={null}/>}/>
            <Route path="/starred" element={<Starred viewTrailer={viewTrailer}/>}/>
            <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer}/>}/>
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>}/>
          </Routes>
        </div>
      </div>
  )
}

export default App
