import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import classnames from 'classnames';
import { closeVideoPlayer, setVideo } from "../../redux/slices/videoPlayerSlice";

export default function VideoPlayer() {
    const video = useSelector((state:RootState) => state['video-player']);
    const dispatch = useDispatch<AppDispatch>();
    const handleVideoPlayerClassNames = classnames("video-player",{
        "video-player--show":video.toggle,
    });
    console.log(video.videos);
    const handleActivePlayListItemClassNames = (key:string) => classnames("play-list__item",{
        "play-list__item--active":key == video.selectedVideo,
    });

    return (
        <div className={handleVideoPlayerClassNames}>
            <div className="video-player__wrapper">
                <iframe
                    className="video-player__player" 
                    src={`https://www.youtube.com/embed/${video.selectedVideo}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                {video.videos.length > 1 && <div className="play-list">
                    {video.videos.map((video,index) => (
                        <div className={handleActivePlayListItemClassNames(video.key)} key={index} onClick={() => dispatch(setVideo(video.key))}>
                            <p>{video.name}</p>
                        </div>
                    ))} 
                </div>}
                <div className="video-player__close" onClick={() => dispatch(closeVideoPlayer())}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        </div>
    );
}