import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated, fetchStatus } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
      return navigate("/login");
  }, [isAuthenticated, isLoading, navigate, fetchStatus]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />{" "}
      </FullPage>
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
