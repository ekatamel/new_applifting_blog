import React, { useState, useReducer } from 'react';
import { useMutation } from 'react-query';
import { LoginType } from '../types/LoginType';
import { useNavigate } from 'react-router-dom';
import { Request } from '../utils/requests';
import { useContext } from 'react';
import { UserContext } from '../utils/UserContext';
import { UserContextInterface } from '../types/UserInterface';

interface StateInterface {
  email: string | null;
  password: string | null;
}

enum ActionTypeInterface {
  setPassword = 'setPassword',
  setEmail = 'setEmail'
}

interface ActionInterface {
  type: ActionTypeInterface;
  payload?: any;
}

export default function Login() {
  const reducer = (state: StateInterface, action: ActionInterface): StateInterface => {
    switch (action.type) {
      case ActionTypeInterface.setEmail:
        return { ...state, email: action.payload };
      case ActionTypeInterface.setPassword:
        return { ...state, password: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, { email: '', password: '' });

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
        setUser({ auth: true });
      }
    }
  );

  return (
    <section className="mt-20 mx-auto w-96 p-8 h-90 shadow-2xl">
      <h1 className="font-bold text-2xl mb-5">Log In</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
          nav('/articles');
        }}>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          className="border-2 border-gray-200 w-full mb-4 h-9 rounded-sm px-2"
          type="text"
          placeholder="me@example.com"
          id="email"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: ActionTypeInterface.setEmail, payload: e.target.value });
          }}
        />
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border-2 border-gray-200 w-full mb-4 h-9 rounded-sm px-2"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: ActionTypeInterface.setPassword, payload: e.target.value });
          }}
        />
        <button className="bg-blue-500 text-white p-2 rounded-sm ml-auto block mt-3">Log In</button>
      </form>
    </section>
  );
}
