import { useState } from "react";
import appStyles from "./app-styles";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

//Hardcoded Search Results Object
const testResults = {
  tracks: {
    items: [
      {
        album: "Album 1",
        artists: "Artist 1",
        id: "8pszIsXQbk6NO3XC0sOFhA",
        name: "Song 1"
      },
      {
        album: "Album 2",
        artists: "Artist 2",
        id: "5c1BTpuCNUGvT4nREys15w",
        name: "Song 2"
      },
      {
        album: "Album 3",
        artists: "Artist 3",
        id: "L63WDXhgu0Kq0ygzxtE1MA",
        name: "Song 3"
      },
      {
        album: "Album 4",
        artists: "Artist 4",
        id: "eqSzZ5UcZ0KQC0HTjG6qBg",
        name: "Song 4"
      },
      {
        album: "Album 5",
        artists: "Artist 5",
        id: "YA1I8HKnBkiDaMezsK3kEA",
        name: "Song "
      },
      {
        album: "Album 6",
        artists: "Artist 6",
        id: "qPQt8VMr0Uel0BYFtyWV5Q",
        name: "Song 6"
      },
      {
        album: "Album 7",
        artists: "Artist 7",
        id: "hmN4tQdqTEyHmGsLKC1EBw",
        name: "Song 7"
      },
      {
        album: "Album 8",
        artists: "Artist 8",
        id: "uCVuGgrJpkiJ1oBCr3vqHw",
        name: "Song 8"
      },
    ]
  }
};

const tracks = testResults.tracks.items;

function App() {
  const [results, setResults] = useState(tracks);
  const [playlistTracks, setPlaylistTracks] = useState([tracks[0], tracks[3], tracks[6]]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  return (
    <main className={appStyles.main}>
      
      <header className={appStyles.header}>
        <h1 className={appStyles.h1}>
          <span>JA</span>
          <span className={appStyles.purpleSpan}>MMM</span>
          <span>ING</span>
        </h1>
      </header>
      
      <SearchBar />
      
      <article className={appStyles.article}>
        <SearchResults results={results} />
        <Playlist 
          playlistTracks={playlistTracks}
          playlistName={playlistName}
        />
      </article>

    </main>
  )
}

export default App
