import "./App.css";
import url from "./components/helper/index";
import { useSelector } from "react-redux";
import PlaylistPage from "pages/Playlist";
import PageLogin from "pages/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Button, Heading, Flex, Spacer, Box } from "@chakra-ui/react";

function App() {
  const isLogin = useSelector((state) => state.token.isLogin);

  return (
    <>
      <Router>
        <div>
          <PageLogin />
          <Flex h="100%">
            <Box p="2">
              <Heading size="md" colorScheme="white" ml="15px">
                <span>App</span>-tify
              </Heading>
            </Box>
            <Spacer />
            <Box>
              {!isLogin ? (
                <Button colorScheme="blue" mr="4" mt="4">
                  <a href={url}>Login</a>
                </Button>
              ) : (
                <Button colorScheme="blue" mr="4" mt="4">
                  {/* <a href="https://app-tify.vercel.app/" className="logout">
                    Logout
                  </a> */}
                  <a href="http://localhost:3000" className="logout">
                    Logout
                  </a>
                </Button>
              )}

              <Button colorScheme="blue" mt="4" mr="15px">
                <Link to="/create-playlist">Create Playlist</Link>
              </Button>
            </Box>
          </Flex>

          <Switch>
            <Route path="/create-playlist">
              {isLogin ? <PlaylistPage /> : <Redirect to="/" />}
            </Route>
            <Route path="/">{/* <PageLogin /> */}</Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
