// import ButtonTrack from "./button/index";

const IsiTrack = ({images, title, artist, album, onSelectMusic, uri, isSelected}) => {
    return (    
        <div className="track">
            <img src={images} alt="images album" />
                <h3>Title: {title}</h3>
                <p>Artist: {artist}</p>
                <p>Albums: {album}</p>
                {/* <button type="submit" id="play">Select</button> */}
                <button onClick={() => onSelectMusic(uri)}>{isSelected ? 'Deselect' : 'Select'}</button>
        </div>
)
};

export default IsiTrack;

