import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";

import { SingInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton Component", () => {
  test("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SingInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  test("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
        },
        expires: "36000",
      },
      status: "authenticated",
    });

    render(<SingInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
