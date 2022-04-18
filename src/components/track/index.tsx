// import ButtonTrack from "./button/index";
import { Button } from "@chakra-ui/react";

interface MusicProperty {
  images: string;
  title: string;
  artist: string;
  album: string;
  onSelectMusic: (uri: string) => void;
  uri: string;
  isSelected: boolean;
}

const IsiTrack = (props: MusicProperty) => {
  return (
    <div className="track">
      <img src={props.images} alt="images album" />
      <h3>Title: {props.title}</h3>
      <p>Artist: {props.artist}</p>
      <p>Albums: {props.album}</p>
      {/* <button type="submit" id="play">Select</button> */}
      <Button
        colorScheme="blue"
        mt="10px"
        onClick={() => props.onSelectMusic(props.uri)}
      >
        {props.isSelected ? "Deselect" : "Select"}
      </Button>
    </div>
  );
};

export default IsiTrack;
