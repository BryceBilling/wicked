import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "../styles/Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuth from "../components/Authentication/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Auth, setAuth] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login-user", {
        username,
        password,
      });
      console.log(response.data);
      if (response.data.message === "Login successful.") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth().then((data) => {
      console.log(data);

      if (data) {
        navigate("/", { replace: true });
      }
      setAuth(data);
    });
  }, []);

  return (
    <div className="login-form">
      <Typography variant="h4" component="h1" className="login-form__title">
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="login-form__form">
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined"
          className="login-form__input"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          className="login-form__input"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="login-form__submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
