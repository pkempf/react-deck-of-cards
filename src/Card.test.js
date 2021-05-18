import { render } from "@testing-library/react";
import Card from "./Card";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

it("renders without crashing", () => {
  render(<Card />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
