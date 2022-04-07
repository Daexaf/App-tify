// import logo from "./logo.svg";
import "./App.css";
// import data from "./data.js";
import IsiTrack from "./components/track/index";
// import ButtonTrack from "./components/track/button/index";
import url from "./components/helper/index";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setToken } from "./app/reduxSlice";
import axios from "axios";
import PlaylistBaru from './components/playlist';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
}from "react-router-dom";

function App() {
  const [cariLagu, setCariLagu] = useState("");
  const [dataLagu, setdataLagu] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [gabungTracks, SetGabungTracks] = useState([]);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [accToken, setAccToken] = useState('');

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?")).searchParams;
    const accessToken = queryString.get("access_token");
    setAccToken(accessToken);
    if(accessToken !== null){
      setAccToken(accessToken);
      setIsLogin(accessToken !== null);

      const setProfile = async () =>{
        try{
          const requestOptions = {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          };
          console.log(requestOptions);

          const response = await fetch(
            `https://api.spotify.com/v1/me`, 
            requestOptions).then((data) => data.json());
          console.log(response);
          setUser(response);
        } catch(err) {
          alert(err);
        }   
      };
      dispatch(setToken(accessToken));
      setProfile();
    }
  }, [dispatch]);

  const getSong = async () => {
    await axios
    .get(
      `https://api.spotify.com/v1/search?q=${cariLagu}&type=track&access_token=${accToken}`
    )
      .then((response) => setdataLagu(response.data.tracks.items))
      .catch((error) => {
        console.log(error);
      });   
  };

  const handleSelectedTrack = (uri) => {
    const alreadySelected = selectedTracks.find((m) => m === uri);
    if (alreadySelected){
      setSelectedTracks(selectedTracks.filter((m) => m !== uri));
    }else{
      setSelectedTracks([...selectedTracks, uri]);
    }
    console.log(selectedTracks);
  };

  useEffect(() =>{
    const gabungTracksWithSelectedTrack = dataLagu.map((songs) =>({
      ...songs,
      isSelected: selectedTracks.find((m) => m === songs.uri) ? true :false
    }));
    SetGabungTracks(gabungTracksWithSelectedTrack);
    console.log(gabungTracksWithSelectedTrack);
  }, [selectedTracks, dataLagu]);
  
  const callMusic = gabungTracks.map((music) => ( 
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
  ));

  const PageLogin = () => {
    return (
      <div className="Loginpage">
        <div className="logincontent">
          <h1>Please Login</h1>
          <a href="{url}">
          <button>Login</button>
          </a>
        </div>
      </div>
    );
  };

  const PlaylistPage = () => {
  return (
    <div className="main">
    <header>
      <div className="navbar">
        <div className="logo">
          <h1>App-tify</h1>
        </div>
        <div className="login">
        {!isLogin ? (
                <a href={url}>Login</a>
              ) : (
                <a href="http://localhost:3000/">Logout</a>
              )}
        </div>
      </div>
      <h1>Create Playlist</h1>
    </header>
    <main>
      <div className="playlist-content">
      {/* {isLogin && (
        <>
        <PlaylistBaru accessToken={accToken} userId={user.id} uris={selectedTracks}/>
        </>
      )} */}
      <PlaylistBaru
        accessToken={accToken}
        userId={user.id}
        uris={selectedTracks}
        />
      </div>
       <div className="inputan">
       <input
         type="search"
         className="inptSrc"
         placeholder="Search"
         aria-label="Search"
         onChange={(e) => {
           console.log(e.target.value);
          setCariLagu(e.target.value)}}
       />
       <button
         className="btnInput"
         type="button"
         onClick={getSong}>Search
       </button>
       </div>
      
       <div className="deskripsi">
         <div className="trackSong">
           <div className="listSong">{callMusic}</div>
         </div>
         </div>
         </main>
       </div>
  );
};

return (
  <>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/create-playlist">Create Playlist</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/create-playlist">
            {isLogin ? <PlaylistPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <PageLogin />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
);
}
// const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;

