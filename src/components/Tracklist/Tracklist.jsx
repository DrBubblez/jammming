import Track from "../Track/Track";
import tracklistStyles from "./tracklist-styles";

function Tracklist() {
    return (
        <ul className={tracklistStyles.ul}>
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
            <Track />
        </ul>
    )
};

export default Tracklist;