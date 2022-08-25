import React, { useState } from 'react';
import '../styles/login.scss';
import { useMutation } from 'react-query';
import { LoginType } from '../types/LoginType';
import { useNavigate } from 'react-router-dom';
import { Request } from '../utils/requests';
import { useContext } from 'react';
import { UserContext } from '../utils/UserContext';
import { UserContextInterface } from '../types/UserInterface';

export default function Login() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { user, setUser } = useContext<UserContextInterface>(UserContext);

  const nav = useNavigate();

  const loginData: LoginType = {
    username: email,
    password: password
  };

  const { mutate } = useMutation(
    async () => {
      const response = await Request.login(loginData);
      return response;
    },
    {
      onSuccess() {
        // console.log(data);
        // localStorage.setItem;
        setUser({ auth: true });
      }
    }
  );

  return (
    <section className="login">
      <h1>Log In</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
          nav('/articles');
        }}>
        <label htmlFor="email" className="login__label">
          Email/username
        </label>
        <input
          className="login__input"
          type="text"
          placeholder="me@example.com"
          id="email"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password" className="login__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login__input"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <button>Log In</button>
      </form>
    </section>
  );
}
