const IsiTrack = ({images, title, artist, album}) => {
    return (    
        <div class="track">
            <div class="logo">
            <img src={images} alt="images album" />
        </div>
        <div class="desc-content">
            <h3>Title: {title}</h3>
            <p>Artist: {artist}</p>
            <p>Albums: {album}</p>
        </div>
        </div>
)
};

export default IsiTrack;

