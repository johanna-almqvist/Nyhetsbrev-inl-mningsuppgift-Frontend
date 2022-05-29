import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Start.css";
import { ILoggedInUser, Login, UpdateUser } from "../services/LoginService";

export interface ILoginUser {
  email: string;
  password: string;
}

export function Start() {
  const [loggedInUser, setLoggedInUser] = useState<ILoggedInUser | null>(null);
  const [login, setLogin] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log(localStorage.getItem("loggedInUser"));
    const storage = localStorage.getItem("loggedInUser");
    if (storage) {
      const localStorageUser = JSON.parse(storage) as ILoggedInUser;
      if (localStorageUser) {
        setLoggedInUser(localStorageUser);
      }
    }
  }, []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    setLogin({ ...login, [name]: e.target.value });
  }
  function handleCheckChange(e: ChangeEvent<HTMLInputElement>) {
    if (loggedInUser) {
      const a = { ...loggedInUser, subscribe: e.target.checked };
      setLoggedInUser(a);
      UpdateUser(a)
        .then((value) => {
          console.log("Det gick bra att ändra prenumerationen");
        })
        .catch(() => {});
    }
  }
  /**
   * setLoggedInUser(null)
   * localStorage.removeItem("loggedInUser")
   */
  function handleLoggOutClick() {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  }

  function onFormSubmit(event: any) {
    event.preventDefault();

    Login(login)
      .then((value) => {
        console.log(value);
        localStorage.setItem("loggedInUser", JSON.stringify(value));
        setLoggedInUser(value);
      })
      .catch(() => {});
  }
  return (
    <div className="bg-img">
      {loggedInUser ? (
        <div className="info-container">
          <h4>Inloggad</h4>
          <h5>{loggedInUser.email}</h5>
          <label htmlFor="subscribe">
            <b>Subscribe</b>
          </label>
          <input
            type="checkbox"
            name="subscribe"
            checked={loggedInUser.subscribe}
            onChange={handleCheckChange}
          />
          <p>{loggedInUser.subscribe}</p>
          <button onClick={handleLoggOutClick}>Logga ut</button>
        </div>
      ) : (
        <form className="container-m" onSubmit={onFormSubmit}>
          <h1>Login</h1>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            value={login.email}
            onChange={handleChange}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={login.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      )}
    </div>
  );
}
