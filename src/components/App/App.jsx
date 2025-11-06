import { useState } from "react";
import appStyles from "./app-styles";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import Spotify from "../../utils/spotify";

//Hardcoded Search Results Object
/* const testResults = {
  tracks: {
    items: [
      {
        album: "Album 1",
        artists: "Artist 1",
        id: "8pszIsXQbk6NO3XC0sOFhA",
        name: "Song 1",
        uri: "spotify:track:6k6HxyqO3OgyVcydZZXmfI"
      },
      {
        album: "Album 2",
        artists: "Artist 2",
        id: "5c1BTpuCNUGvT4nREys15w",
        name: "Song 2",
        uri: "spotify:track:4sNfEL2D6Qgy370ajeldtJ"
      },
      {
        album: "Album 3",
        artists: "Artist 3",
        id: "L63WDXhgu0Kq0ygzxtE1MA",
        name: "Song 3",
        uri: "spotify:track:66TqKIWKHH2iQsOLzMexjo"
      },
      {
        album: "Album 4",
        artists: "Artist 4",
        id: "eqSzZ5UcZ0KQC0HTjG6qBg",
        name: "Song 4",
        uri: "spotify:track:3CZDkpmq245kzvCe44P2hM"
      },
      {
        album: "Album 5",
        artists: "Artist 5",
        id: "YA1I8HKnBkiDaMezsK3kEA",
        name: "Song 5",
        uri: "spotify:track:6spmQ1gUjeu10pUUxnLyZW"
      },
      {
        album: "Album 6",
        artists: "Artist 6",
        id: "qPQt8VMr0Uel0BYFtyWV5Q",
        name: "Song 6",
        uri: "spotify:track:0KHTwfaUiDHy4lATwLFwr4"
      },
      {
        album: "Album 7",
        artists: "Artist 7",
        id: "hmN4tQdqTEyHmGsLKC1EBw",
        name: "Song 7",
        uri: "spotify:track:4uFUalyidCKsnJbFCzRmhs"
      },
      {
        album: "Album 8",
        artists: "Artist 8",
        id: "uCVuGgrJpkiJ1oBCr3vqHw",
        name: "Song 8",
        uri: "spotify:track:07LBI2Yn6yQxyDnzVqgkj5"
      },
    ]
  }
};

const tracks = testResults.tracks.items; */

function App() {
  const [results, setResults] = useState([]);

  const searchTracks = (term) => {
    Spotify.searchTrack(term).then(setResults);
  };

  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const addTrack = (track) => { // Checks the playlist state variable if the track is already added before adding.
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id))
      return;
    
    setPlaylistTracks((prev) => [...prev, track]);
  };

  const removeTrack = (track) => { // Filters the track out of the playlist array varible.
     setPlaylistTracks((prev) => 
      prev.filter((addedTracks) => addedTracks.id !== track.id)
    );
  };

  const [playlistName, setPlaylistName] = useState('');
  
  const updateName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs)
    console.log(trackURIs);
  };

  return (
    <main className={appStyles.main}>
      
      <header className={appStyles.header}>
        <h1 className={appStyles.h1}>
          <span>JA</span>
          <span className={appStyles.purpleSpan}>MMM</span>
          <span>ING</span>
        </h1>
      </header>
      
      <SearchBar onSearch={searchTracks} />
      
      <article className={appStyles.article}>
        <SearchResults results={results}  onAdd={addTrack} />
        <Playlist 
          playlistTracks={playlistTracks}
          playlistName={playlistName}
          onRemove={removeTrack}
          onNameChange={updateName}
          onSave={savePlaylist}
        />
      </article>

    </main>
  )
}

export default App
