import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/reduxSlice";
import { useState } from "react";
import { Center } from "@chakra-ui/react";

const PageLogin = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
          dispatch(
            setToken({
              accessToken: accessToken,
              user: response,
            })
          );
          console.log(response);
          setUser(response);
        } catch (err) {
          alert(err);
        }
      };

      setProfile();
    }
  }, [dispatch]);

  return (
    <div className="Loginpage">
      <div className="logincontent">
        {isLogin ? (
          <Center bg="#8FAFC5" h="50px" color="white" mt="px">
            Selamat Datang, silahkan buat playlist
          </Center>
        ) : (
          <Center bg="#8FAFC5" h="50px" color="white" mt="px">
            Silahkan Login
          </Center>
        )}
      </div>
    </div>
  );
};

export default PageLogin;
