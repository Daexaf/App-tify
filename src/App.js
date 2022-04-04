// import logo from "./logo.svg";
import "./App.css";
// import data from "./data.js";
import IsiTrack from "./components/track/index";
// import ButtonTrack from "./components/track/button/index";
import url from "./components/helper/index";
import { useEffect, useState } from "react";
import axios from "axios";
import playlistBaru from './components/playlist';

function App() {
  const [token, setToken] = useState("");
  const [cariLagu, setCariLagu] = useState("");
  const [dataLagu, setdataLagu] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [gabungTracks, SetGabungTracks] = useState([]);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?")).searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
    if(accessToken !== null){
      setToken(accessToken);
      setIsLogin(accessToken !== null);

      const setProfile = async () =>{
        try{
          const requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          };
          console.log(requestOptions);

          const response = await fetch(`https://api.spotify.com/v1/me`, requestOptions).then(data => data.json());
          console.log(response);
          setUser(response);
        } catch(err) {
          alert(err)
        }   
      }
      setProfile();
    }
  }, []);

  const getSong = async () => {
    await axios
    .get(
      `https://api.spotify.com/v1/search?q=${cariLagu}&type=track&access_token=${token}`
    )
      .then((response) => setdataLagu(response.data.tracks.items))
      .catch((error) => {
        console.log(error);
      });   
  };

  const handleSelectedTrack = (uri) => {
    const alreadySelected = selectedTracks.find(m => m === uri);
    if (alreadySelected){
      setSelectedTracks(selectedTracks.filter((m) => m !== uri))
    }else{
      setSelectedTracks([...selectedTracks, uri]);
    }
    console.log(selectedTracks)
  }

  useEffect(() =>{
    const gabungTracksWithSelectedTrack = dataLagu.map((songs) =>({
      ...songs,
      isSelected: selectedTracks.find((m) => m === songs.uri) ? true :false,
    }));
    SetGabungTracks(gabungTracksWithSelectedTrack);
    console.log(gabungTracksWithSelectedTrack);
  }, [selectedTracks, dataLagu]);
  
  const callMusic = gabungTracks.map((music) => 
    <IsiTrack
      key={music.id}
      images={music.album.images[1].url}
      title={music.name}
      artist={music.artists[0].name}
      album={music.album.name}
      onSelectMusic={handleSelectedTrack}
      uri={music.uri}
      isSelected={music.isSelected}
    />
  );

  return (

    <div className="main">
      <header>
       <div className="navbar">
         <div className="logo">
           <h1>App-tify</h1>
         </div>
         <div className="login">
           {!isLogin && (<a
         href={url}
         className="loginan"
       >
         Login
       </a>)}
       <h1>Create Playlist</h1>
         </div>
       </div>
       </header>
    </div>
    <main>
      <div className="playlist-content">
      {isLogin && (<playlistBaru accessToken={token} userId={user.id} uris={selectedMusic}/>)}
      </div>
    </main>
    // <main> 
    //   <div className="inputan">
    //   <input
    //     type="search"
    //     className="inptSrc"
    //     placeholder="Search"
    //     aria-label="Search"
    //     onChange={(e) => setCariLagu(e.target.value)}
    //   />
    //   <button
    //     className="btnInput"
    //     type="button"
    //     onClick={getSong}
    //   >
    //     Search
    //   </button>
    //   </div>
      
    //   <div className="deskripsi">
    //     <div className="trackSong">
    //       <div className="listSong">{callMusic}</div>
    //     </div>
    //   </div>
    // </main>
  );
}

// const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;
