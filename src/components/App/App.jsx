import appStyles from "./app-styles";
import SearchBar from "../SearchBar/SearchBar";

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
      
      <section>

      </section>

    </main>
  )
}

export default App
