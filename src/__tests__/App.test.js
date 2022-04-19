import { render, screen } from "@testing-library/react";
// import App from "../App";
import PlaylistBaru from "../components/playlist";

test("renders learn react link", () => {
  render(<PlaylistBaru />);
  expect(screen.getByText(/description/i)).toBeInTheDocument();
});
