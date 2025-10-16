import trackStyles from "./track-styles";

function Track() {
    return(
        <li className={trackStyles.li}>
            <div className={trackStyles.div}>
                <h3 className={trackStyles.h3}>Song Title</h3>
                <p className={trackStyles.p}>Artist Name | Album</p>
            </div>
            <button className={trackStyles.button}>+</button>
        </li>
    );
};

export default Track;