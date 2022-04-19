import { rest } from "msw";
export const handlers = [
  rest.get(
    "https://api.spotify.com/v1/search?q=takayan&type=track",
    (req, res, ctx) => {
      // Persist user's authentication in the session
      sessionStorage.setItem("is-authenticated", "true");
      return res(
        // Respond with a 200 status code
        ctx.status(200)
      );
    }
  ),
];
