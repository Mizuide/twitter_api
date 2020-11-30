import React, { useState,useContext,useRef} from "react";

function Example() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef();
    intervalRef.current=count;    
    function handleAlertClick() {
      setTimeout(() => {
        alert('You clicked on: ' + intervalRef.current);
      }, 3000);
    }
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button onClick={handleAlertClick}>
          Show alert
        </button>
      </div>
    );
  }

  export default Example;