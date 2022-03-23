import logo from "./logo.svg";
import "./App.css";
import data from "./data.js";

function App() {
  return (
    <main>
      <h1>Create Playlist</h1>

      <div class="deskripsi">
        <div class="logo">
          <img src={data.album.images[1].url} alt="" />
        </div>
        <div class="desc-content">
          <h3>Title: {data.name}</h3>
          <p>Artist: {data.album.artists[0].name}</p>
          <p>Albums: {data.album.name}</p>
          <button type="submit" id="play">
            Select
          </button>
        </div>
      </div>
    </main>
  );
}

const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;
