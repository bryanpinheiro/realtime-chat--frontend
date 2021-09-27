import { render } from "@testing-library/react";
import Message from "./Message";

test("renders a message", () => {
    const { getByText } = render(<Message leftSide={false} isFirst={true} text="Bryan" />);
    const div = getByText(/Bryan/);
    expect(div).toHaveTextContent("Bryan");
});