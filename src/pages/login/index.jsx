import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/reduxSlice";
import url from "../../components/helper/index";
import { useState } from "react";
import { Center } from "@chakra-ui/react";

const PageLogin = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
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

export default PageLogin;
