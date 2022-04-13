import "./App.css";
import IsiTrack from "./components/track/index";
import url from "./components/helper/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./app/reduxSlice";
import axios from "axios";
import PlaylistBaru from "./components/playlist";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Grid,
  Heading,
  Flex,
  Spacer,
  Box,
  Center,
  Square,
  Circle,
  Input,
  Textarea,
} from "@chakra-ui/react";

function App() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [accToken, setAccToken] = useState("");

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setAccToken(accessToken);
    if (accessToken !== null) {
      setAccToken(accessToken);
      setIsLogin(accessToken !== null);

      const setProfile = async () => {
        try {
          const requestOptions = {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
            },
          };
          console.log(requestOptions);

          const response = await fetch(
            `https://api.spotify.com/v1/me`,
            requestOptions
          ).then((data) => data.json());
          console.log(response);
          setUser(response);
        } catch (err) {
          alert(err);
        }
      };
      dispatch(setToken(accessToken));
      setProfile();
    }
  }, [dispatch]);

  const PageLogin = () => {
    return (
      <div className="Loginpage">
        <div className="logincontent">
          {isLogin ? (
            <Center bg="gray.500" h="30px" color="white" mt="5px">
              Selamat Datang, silahkan buat playlist
            </Center>
          ) : (
            <Center bg="gray.500" h="30px" color="white" mt="10px">
              Silahkan Login
            </Center>
          )}
        </div>
      </div>
    );
  };

  const PlaylistPage = () => {
    const [dataLagu, setdataLagu] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [gabungTracks, SetGabungTracks] = useState([]);

    const [cariLagu, setCariLagu] = useState("");
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
      if (alreadySelected) {
        setSelectedTracks(selectedTracks.filter((m) => m !== uri));
      } else {
        setSelectedTracks([...selectedTracks, uri]);
      }
      console.log(selectedTracks);
    };

    useEffect(() => {
      const gabungTracksWithSelectedTrack = dataLagu.map((songs) => ({
        ...songs,
        isSelected: selectedTracks.find((m) => m === songs.uri) ? true : false,
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
    return (
      <div className="main">
        {/* <header>
          <div className="navbar">
            <div className="logo">
              <Heading>App-tify</Heading>
            </div>
            <div className="login">
              {!isLogin ? (
                <a href={url}>Login</a>
              ) : (
                <a href="http://localhost:3000/" className="logout">Logout</a>
              )}
            </div>
          </div>
          <h1 className="judul">Create Playlist</h1>
        </header> */}
        <main>
          <div className="playlist-content">
            <PlaylistBaru
              accessToken={accToken}
              userId={user.id}
              uris={selectedTracks}
            />
          </div>
          <div className="inputan">
            <Center>
              <Input
                placeholder="Basic usage"
                htmlSize={10}
                width="auto"
                mr="10"
                onChange={(e) => setCariLagu(e.target.value)}
              />
            </Center>
            {/* <input
              type="search"
              className="inptSrc"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setCariLagu(e.target.value)}
            /> */}
            <Center>
              {/* <button className="btnInput" type="button" onClick={getSong}>
                Search
              </button> */}
              <Button
                // rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={getSong}
                mr="45px"
                mt="10px"
              >
                Search
              </Button>
            </Center>
          </div>

          <div className="deskripsi">
            <div className="trackSong">
              <div className="listSong">
                <Grid
                  templateColumns="repeat(4, 1fr)"
                  gap={2}
                  mt="10"
                  ml="10"
                  mr="10"
                >
                  {callMusic}
                </Grid>
              </div>
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
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/create-playlist">Create Playlist</Link>
              </li>
            </ul>
          </nav> */}
          <Flex>
            <Box p="2">
              <Heading size="md">App-tify</Heading>
            </Box>
            <Spacer />
            <Box>
              {!isLogin ? (
                <Button colorScheme="teal" mr="4" mt="4">
                  <a href={url}>Login</a>
                </Button>
              ) : (
                <Button colorScheme="teal" mr="4" mt="4">
                  <a href="http://localhost:3000/" className="logout">
                    Logout
                  </a>
                </Button>
              )}

              <Button colorScheme="teal" mt="4">
                <Link to="/create-playlist">Create Playlist</Link>
              </Button>
            </Box>
          </Flex>

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
export default App;
