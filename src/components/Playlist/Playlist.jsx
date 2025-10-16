import Tracklist from "../Tracklist/Tracklist";
import playlistStyles from "./playlist-styles";

function Playlist() {
    return (
        <section className={playlistStyles.section}>
            <input className={playlistStyles.input} type="text"  placeholder="Playlist Name"/>
            <Tracklist />
            <button className={playlistStyles.button}>SAVE TO SPOTIFY</button>
        </section>
    );
};

export default Playlist;