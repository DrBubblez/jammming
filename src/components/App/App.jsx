import appStyles from "./app-styles";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
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
        <SearchResults />
        <Playlist />
      </article>

    </main>
  )
}

export default App
