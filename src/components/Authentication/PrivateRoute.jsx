import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../General/AppLayout";
import checkAuth from "./useAuth";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const [Auth, setAuth] = useState(false);

  useEffect(() => {
    checkAuth().then((data) => {
      if (!data) {
        navigate("/login", { replace: true });
      }
      setAuth(data);
    });
  }, []);

  return <>{Auth && <AppLayout />}</>;
}
