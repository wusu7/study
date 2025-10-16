
import React from "react";
import { useCounterStore } from "../store/useCounterStore";

const Counter: React.FC = () => {
  const { value, increment, decrement, incrementByAmount, reset } =
    useCounterStore();
  return (
    <>
      <p>Count: {value}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => incrementByAmount(10)}>Increment by 10</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Counter;
