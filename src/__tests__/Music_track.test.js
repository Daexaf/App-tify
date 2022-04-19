import { render, screen } from "@testing-library/react";
import IsiTrack from "components/track";

test("rendering track component", () => {
  render(<IsiTrack />);

  const images = screen.getByTestId("img-preview");
  const title = screen.getByTestId("title");
  const album = screen.getByTestId("album");
  const artist = screen.getByTestId("artist");

  // expect(screen.getByText('Track')).toBeInTheDocument();
  expect(images).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(album).toBeInTheDocument();
  expect(artist).toBeInTheDocument();
});
