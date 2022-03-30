// import logo from "./logo.svg";
import "./App.css";
import data from "./data.js";
import IsiTrack from "./components/track/index";
// import ButtonTrack from "./components/track/button/index";
import url from "./components/helper/index";
import { useEffect, useState } from "react";

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
    await fetch(
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
        className="py-2 px-4 bg-blue-600 rounded text-white font-medium uppercase hover:bg-blue-700 text-xs leading-tight"
      >
        Login
      </a>
      <input
        type="search"
        className="flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-white border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setCariLagu(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-blue-700"
        type="button"
        onClick={getSong}
      >
        Search
      </button>
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
