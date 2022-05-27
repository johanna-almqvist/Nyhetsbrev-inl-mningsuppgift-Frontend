import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CreateUser } from "../services/LoginService";
import { useNavigate } from "react-router-dom";

export interface INewUser {
  email: string;
  password: string;
  subscribe: boolean;
}

export function Join() {
  const [newUser, setNewUser] = useState<INewUser>({
    email: "",
    password: "",
    subscribe: false,
  });

  let navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    setNewUser({ ...newUser, [name]: e.target.value });
  }
  function handleChangeCheckbox(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    setNewUser({ ...newUser, [name]: e.target.checked });
  }
  useEffect(() => {
    console.log(newUser);
  }, [newUser]);
  function onFormSubmit(event: any) {
    event.preventDefault();
    CreateUser(newUser).then((value) => {
      //TODO Säg åt App.TS att vi är inloggade med en person(value)
      localStorage.setItem("loggedInUser", JSON.stringify(value));
      navigate("/");
      console.log(value);
    });
  }
  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Epost</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Anders.Anderson@gmail.com"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Prenumerera på vårt nyhetsbrev"
            name="subscribe"
            checked={newUser.subscribe}
            onChange={handleChangeCheckbox}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
