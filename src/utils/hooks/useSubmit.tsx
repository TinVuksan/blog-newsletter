import { useNavigate } from "react-router-dom";

export function useLoginSubmit() {
  const navigate = useNavigate();
  const handleLogin = (email: string, password: string): void => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => res.json())
      .then((data): void => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          console.log(data.data);
          localStorage.setItem("username", data.data.username);
          navigate("/home");
        }
      })
      .catch((err) => console.error(err));
  };

  return [handleLogin];
}

export function useRegisterSubmit() {
  const navigate = useNavigate();

  const handleRegister = (
    email: string,
    password: string,
    tel: string,
    username: string
  ): void => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        tel,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => res.json())
      .then((data): void => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return [handleRegister];
}
