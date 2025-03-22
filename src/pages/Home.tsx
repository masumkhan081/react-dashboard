import React from 'react';
import { useAtom } from 'jotai';
import { countAtom } from '../store/context';
import { Link } from 'react-router-dom';

function Home() {
  const [count, setCount] = useAtom(countAtom); 

  return (
    <div>
      <h1>Home Page</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      {/* <p>User: {user.name}</p>
      <button onClick={() => setUser({ name: 'Jane Doe' })}>Change User</button> */}

      <br />
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}

export default Home;
