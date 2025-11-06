import { useState } from "react";
import searchStyles from "./search-bar-styles";

function SearchBar(props) {
    const [term, setTerm] = useState('')
    
    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const search = (event) => {
        if (!term) { 
            alert('You need to enter a song name!');
            return;
        } else {
            event.preventDefault();
            props.onSearch(term);
        };
    };

    return(
        <form role="search" className={searchStyles.form}>
            <input className={searchStyles.input} type='search' name='search' onChange={handleTermChange} placeholder="Search song name..." />
            <button className={searchStyles.button} onClick={search} aria-label="Search Button">SEARCH</button>
        </form>
    );
};

export default SearchBar;