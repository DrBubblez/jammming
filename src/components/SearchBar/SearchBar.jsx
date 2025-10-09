import searchStyles from "./search-bar-styles";

function SearchBar() {
    return(
        <form role="search" className={searchStyles.form}>
            <input className={searchStyles.input} type='search' name='search' placeholder="Search song name..."/>
            <button className={searchStyles.button} aria-label="Search Button">SEARCH</button>
        </form>
    );
};

export default SearchBar;