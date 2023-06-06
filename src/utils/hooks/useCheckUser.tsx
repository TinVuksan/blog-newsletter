import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useCheckUser() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = (): void => {
      if (!localStorage.getItem("username")) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);
}

export function useHandleSignout() {
  const navigate = useNavigate();
  const handleSignout = (): void => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return [handleSignout];
}
