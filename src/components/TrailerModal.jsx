import Popup from "reactjs-popup";
import YouTubePlayer from "react-player/youtube";
import '../styles/modal.scss'

const TrailerModal = ({videoKey}) => {
    const trailerUrl = `https://www.youtube.com/watch?v=${videoKey}`;

    return (
        <Popup open={!!videoKey} closeOnDocumentClick>
                <YouTubePlayer url={trailerUrl}
                               controls={true}
                               playing={true}
                               width='75vw'
                               height='50vh'>
                </YouTubePlayer>
        </Popup>
    );
}


export default TrailerModal;