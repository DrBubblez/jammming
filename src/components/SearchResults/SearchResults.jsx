import Tracklist from "../Tracklist/Tracklist";
import resultStyles from "./result-styles";

function SearchResults(props) {
    return (
        <section className={resultStyles.section}>
            <h2 className={resultStyles.h2}>RESULTS</h2>
            <Tracklist tracks={props.results} />
        </section>
    );
};

export default SearchResults;