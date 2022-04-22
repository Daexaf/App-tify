var id_client = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// var redirect_uri = "https://app-tify.vercel.app/";
var redirect_uri = "http://localhost:3000";

var state = "ApptifyIhsan";

localStorage.setItem("TOKEN", state);
var scope = "playlist-modify-private";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(id_client);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

console.log(id_client);

export default url;
