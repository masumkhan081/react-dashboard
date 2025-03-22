import React from 'react';
import { useAtom } from 'jotai';
import { countAtom, useFullName, incrementCount, decrementCountAtom, fullNameAtom } from '../store/context';
import { Link } from 'react-router-dom';

function About() {
  const [count] = useAtom(countAtom);
  const [fullName, setFn] = useFullName();

  return (
    <div>
      <h1>About Page</h1>
      <p>Count: {count}</p>
      <p>User: {fullName}</p>
      <input className='border bg-sky-200' type="text" value={fullName} onChange={(e)=>setFn(e.target.value)} />
      
      <Link to="/">Go Back to Home Page</Link>
    </div>
  );
}

export default About;