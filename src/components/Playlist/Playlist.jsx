import Tracklist from "../Tracklist/Tracklist";
import playlistStyles from "./playlist-styles";

function Playlist(props) {

    const handleTextChange = (event) => {
        props.onNameChange(event.target.value);
    };

    return (
        <section className={playlistStyles.section}>
            <input className={playlistStyles.input} type="text" onChange={handleTextChange} placeholder="New Playlist"/>
            <Tracklist 
                tracks={props.playlistTracks}
                isAdded={true}
                onRemove={props.onRemove}
            />
            <button className={playlistStyles.button} onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </section>
    );
};

export default Playlist;