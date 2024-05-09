import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useCallback } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharcater, setIsCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(isNumber) str += "0123456789";
    if(isCharcater) str += "!@#$%^&*()_+}{=";
    for (let i = 0; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, isCharcater, isNumber]);

  const copyPasstoClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-800'>
        <h1 className='text-white text-center mb-3 text-2xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 text-black'
          placeholder='password...'
          readOnly
          ref={passwordRef}
          />
          <button 
              className='outline-none bg-gray-700 text-white px-3 py-0.5 shrink-0'
              onClick={passwordGenerator}
              >Generate</button>
          <button 
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
              onClick={copyPasstoClipboard}
              >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                value={length}
                min={6}
                max={50}
                className='cursor-pointer'
                id='length'
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label htmlFor='length'>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox" 
                defaultChecked={isNumber}
                id='numberInput'
                onChange={() => {
                  setIsNumber((prev) => !prev);
                }}
                />
                <label htmlFor="numberINput">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox" 
                defaultChecked={isCharcater}
                id='character'
                onChange={() => {
                  setIsCharacter((prev) => !prev);
                }}
                />
                <label htmlFor="character">Character</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
