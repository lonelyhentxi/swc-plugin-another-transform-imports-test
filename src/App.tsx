import "./styles.css";
import {Button} from "antd";
import {useCallback} from "react";
import { isNumber } from 'lodash';

export default function App() {

  const handleClick = useCallback(() => {
    if (isNumber(42)) {
      alert("It works!");
    }
  }, [])

  return (
    <div className="App">
      <h1>Hello Test</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button type="primary" onClick={handleClick}>haha</Button>
    </div>
  );
}
