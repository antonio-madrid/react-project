import Popup from "reactjs-popup";
import YouTubePlayer from "react-player/youtube";
import '../styles/modal.scss'

const TrailerModal = ({trailerKey}) => {
    const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;

    return (<div>
            <Popup open={!!trailerKey} closeOnDocumentClick>
                {close => (
                    <div className='modal-content-wrapper' data-testid="youtube-player">
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <YouTubePlayer
                                url={trailerUrl}
                                controls={true}
                                playing={true}
                                width='100%'
                                height='100%'>
                            </YouTubePlayer>
                        </div>
                    </div>)}
            </Popup>
        </div>);
}


export default TrailerModal;