import trackStyles from "./track-styles";

function Track(props) {

    const onAdd = (event) => {
        props.onAdd(props.track);
    };

    const onRemove = (event) => {
        props.onRemove(props.track);
    };

    const renderButton = () => {
        if(props.isAdded) {
            return <button className={trackStyles.removeButton} onClick={onRemove}>-</button>
        } else {
            return <button className={trackStyles.addButton} onClick={onAdd}>+</button>
        };
    };

    return(
        <li className={trackStyles.li}>
            <div className={trackStyles.div}>
                <h3 className={trackStyles.h3}>{props.track.name}</h3>
                <p className={trackStyles.p}>{props.track.artists} | {props.track.album}</p>
            </div>
            {renderButton()}
        </li>
    );
};

export default Track;