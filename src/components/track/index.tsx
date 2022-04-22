import { Button } from "@chakra-ui/react";

interface MusicProperty {
  images: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  onSelectMusic: (uri: string) => void;
  uri: string;
  isSelected: boolean;
}

const IsiTrack = (props: MusicProperty) => {
  return (
    <div className="track">
      <img src={props.images} alt="images album" data-testid="img-preview" />
      <h3 data-testid="title">Title: {props.title}</h3>
      <p data-testid="artist">Artist: {props.artist}</p>
      <p data-testid="album">Albums: {props.album}</p>
      <p data-testid="duration">Duration: {props.duration}</p>
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
