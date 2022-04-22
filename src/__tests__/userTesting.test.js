import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlaylistBaru from "../components/playlist";

test("click create button", () => {
  render(<PlaylistBaru />);

  userEvent.click(screen.getByText("Create"));
  expect(screen.getByRole("button")).toHaveTextContent("Create");
});
