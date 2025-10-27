import Tracklist from "../Tracklist/Tracklist";
import playlistStyles from "./playlist-styles";

function Playlist(props) {
    return (
        <section className={playlistStyles.section}>
            <input className={playlistStyles.input} type="text"  placeholder={props.playlistName}/>
            <Tracklist 
                tracks={props.playlistTracks}
            />
            <button className={playlistStyles.button}>SAVE TO SPOTIFY</button>
        </section>
    );
};

export default Playlist;