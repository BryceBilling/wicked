import { useEffect, useState } from "react";

export default async function checkAuth() {
  try {
    const response = await fetch("/api/checkAuth");
    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    return console.error(error);
  }
}
