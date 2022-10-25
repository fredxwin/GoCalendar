import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";

describe("<Calendar>", () => {
  it("should display text October 2022", () => {
    render(<Calendar date="2022-10-25" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "October 2022"
    );
  });
  it("weekdays row should be visible", async () => {
    render(<Calendar date="2022-10-25" />);
    const week = screen.getByTestId("weekdays");
    expect(week).toBeVisible();
  });
  it("invalid date format should display error", () => {
    render(<Calendar date="hello" />);
    const error = screen.getByTestId("invalid");
    expect(error).toBeVisible();
  });
});
