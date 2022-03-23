import logo from "./logo.svg";
import "./App.css";
import data from "./data.js";
import  IsiTrack  from "./components/track/index";
import ButtonTrack from "./components/track/button/index";

function App() {
  return (
    <main>
      <h1>Create Playlist</h1>
      <div class="deskripsi">
      
      <IsiTrack 
        images={data.album.images[1].url}
        title={data.name}
        artist={data.artists[0].name}
        album={data.album.name}
        />
        <ButtonTrack />
        </div>
    </main>
  );
}

const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;
