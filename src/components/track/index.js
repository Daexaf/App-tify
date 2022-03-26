import ButtonTrack from "./button/index";

const IsiTrack = ({images, title, artist, album}) => {
    return (    
        <div class="track">
            <img src={images} alt="images album" />
                <h3>Title: {title}</h3>
                <p>Artist: {artist}</p>
                <p>Albums: {album}</p>
                <ButtonTrack />
        </div>
)
};

export default IsiTrack;

