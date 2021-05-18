import { render } from "@testing-library/react";
import CardsApp from "./CardsApp";

it("renders without crashing", () => {
  render(<CardsApp />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<CardsApp />);
  expect(asFragment()).toMatchSnapshot();
});
