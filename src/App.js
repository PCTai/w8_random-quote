
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { url } from './constants'

function App() {
  const [advice, setAdvice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const debounceDropDown = useCallback(debounce(() => getAdvice(), 500), []);

  const getAdvice = async () => {
    try {
      const advice = await fetch(url).then(res => {
        return res.json()
      }).then(res => {
        console.log(res.slip.advice);
        setAdvice(res.slip.advice);
        setIsLoading(false);
        return res.slip.advice;
      });

    } catch (error) {

    }
  }

  const handleGetAdvice =( ) =>{
    // getAdvice();
    setIsLoading(true);
    debounceDropDown();

  }
  useEffect(() => {
    getAdvice();
  }, [])

  return (
    <div className="App">
      {isLoading ? (<h3 className='loading'>
        <div className='loading-item'></div>
        <div className='loading-item'></div>
        <div className='loading-item'></div>
      </h3>) : <h3 className='advice'>{advice}</h3>}
      <button className='btn' onClick={handleGetAdvice}>Give me advice!</button>
    </div>
  );
}

export default App;
