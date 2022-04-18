import axios from "axios";
import IsiTrack from "components/track";
import PlaylistBaru from "components/playlist";
import { useState, useEffect } from "react";
import { Button, Grid, Center, Input } from "@chakra-ui/react";
// import { useSelector, RootStateOrAny } from "react-redux";
import { useAppSelector } from "app/hooks";

interface PropertyData {
  id: string;
  uri: string;
  album: {
    images: [{ url: string }, { url: string }];
    name: string;
  };
  name: string;
  artists: [{ name: string }];
  isSelected: isSelected;
}

interface usrType {
  token: {
    token: {
      access_token: string;
      user: {
        id: string;
      };
    };
  };
}

type isSelected = boolean;

export interface SelectedSongType {
  uri: string;
}

const PlaylistPage = () => {
  const [accToken, setAccToken] = useState("");
  const [dataLagu, setdataLagu] = useState<PropertyData[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<
    SelectedSongType["uri"][]
  >([]);
  const [gabungTracks, SetGabungTracks] = useState<PropertyData[]>([]);
  const [cariLagu, setCariLagu] = useState("");
  const [user, setUser] = useState<any>({} as usrType);
  const accessToken = useAppSelector(
    (state: any) => state.token.token.accessToken
  );
  const userData = useAppSelector((state: any) => state.token.user);

  useEffect(() => {
    setAccToken(accessToken);
    setUser(userData);
  }, [accessToken, userData]);

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

  const handleSelectedTrack = (uri: string) => {
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
              placeholder="Cari Lagu Anda"
              htmlSize={10}
              width="auto"
              mr="10px"
              mt="10px"
              ml="30px"
              color="white"
              onChange={(e) => setCariLagu(e.target.value)}
            />
          </Center>

          <Center>
            <Button
              colorScheme="blue"
              onClick={getSong}
              mr="45px"
              mt="10px"
              ml="60px"
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

export default PlaylistPage;
