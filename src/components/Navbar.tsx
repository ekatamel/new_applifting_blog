import logo from '../img/logo.png';
import React, { useContext, useReducer } from 'react';
import { UserContext } from '../utils/UserContext';
import arrow from '../img/arrow-right.png';
import chunk from 'lodash/chunk';
import difference from 'lodash/difference';
import keyBy from 'lodash/keyBy';

function Navbar() {
  const { user } = useContext(UserContext);

  const myList = ['Banana', 'Banana', 'Orange', 'Plum', 'Pear'];

  const myNewArray = difference(myList, ['Plum, Banana, Apple']);

  // console.log(myNewArray);

  let posts: any = [
    { id: '1', title: 'Dummy First blog post' },
    { id: '2', title: ' DummySecond blog post' },
    { id: '3', title: 'Dunny third blog post' }
  ];

  posts = keyBy(posts, 'id');
  console.log(keyBy(posts, 'id'));

  return (
    <header className="bg-gray-50 h-20">
      <nav className="w-10/12 mx-auto h-full flex items-center gap-7">
        <a href="/">
          <img src={logo} alt="" />
        </a>

        <a className="text-lg" href="/myarticles">
          My Articles
        </a>
        <a className="text-lg" href="">
          About
        </a>
        {user?.auth === true ? (
          <a className="text-lg ml-4" href="/login">
            Log out
          </a>
        ) : (
          <a className="text-lg ml-auto text-blue-500 flex items-center">
            Log in
            <img src={arrow} className="w-5 ml-2" />
          </a>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
