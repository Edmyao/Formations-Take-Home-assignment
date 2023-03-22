import { render } from "@testing-library/react";
import AlertMessage from "./AlertMessage";

test("renders alert message", () => {
    const { getByTestId } = render(<AlertMessage message="test alert" />);
    expect(getByTestId("alert-message")).toHaveTextContent("test alert");
});

test("hides alert message on empty string message", () => {
    const { queryByTestId } = render(<AlertMessage message="" />);
    expect(queryByTestId("alert-message")).not.toBeInTheDocument();
});
test("hides alert message on null message", () => {
    const { queryByTestId } = render(<AlertMessage message={null} />);
    expect(queryByTestId("alert-message")).not.toBeInTheDocument();
});
