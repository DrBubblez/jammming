import trackStyles from "./track-styles";

function Track(props) {
    return(
        <li className={trackStyles.li}>
            <div className={trackStyles.div}>
                <h3 className={trackStyles.h3}>{props.track.name}</h3>
                <p className={trackStyles.p}>{props.track.artists} | {props.track.album}</p>
            </div>
            <button className={trackStyles.button}>+</button>
        </li>
    );
};

export default Track;