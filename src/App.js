// import logo from "./logo.svg";
import "./App.css";
import data from "./data.js";
import IsiTrack from "./components/track/index";
// import ButtonTrack from "./components/track/button/index";
import url from "./components/helper/index";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [cariLagu, setCariLagu] = useState("");
  const [dataLagu, setdataLagu] = useState([]);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
  }, []);

  const getSong = async () => {
    await axios
    .get(
      `https://api.spotify.com/v1/search?q=${cariLagu}&type=track&access_token=${token}`
    )
      .then((response) => {
        setdataLagu(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callMusic = dataLagu.map((music) => (
    <IsiTrack
      key={music.id}
      images={music.album.images[1].url}
      title={music.name}
      artist={music.artists[0].name}
      album={music.album.name}
    />
  ));

  return (
    <main>
      <h1>Create Playlist</h1>
      <a
        href={url}
        className="loginan"
      >
        Login
      </a>
      <div className="inputan">
      <input
        type="search"
        className="inptSrc"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setCariLagu(e.target.value)}
      />
      <button
        className="btnInput"
        type="button"
        onClick={getSong}
      >
        Search
      </button>
      </div>
      
      <div className="deskripsi">
        <div className="trackSong">
          <div className="listSong">{callMusic}</div>
        </div>
      </div>
    </main>
  );
}

// const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;
