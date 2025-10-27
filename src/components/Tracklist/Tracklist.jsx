import Track from "../Track/Track";
import tracklistStyles from "./tracklist-styles";

function Tracklist(props) {
    return (
        <ul className={tracklistStyles.ul}>
            {props.tracks.map((track) => {
                return (
                    <Track 
                        track={track}
                        key={track.id}
                    />
                );
            })}
        </ul>
    )
};

export default Tracklist;