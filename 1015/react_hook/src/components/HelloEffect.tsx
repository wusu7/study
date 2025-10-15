import { useEffect, useState } from "react";

export default function HelloEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("컴포넌트가 화면에 나타났어요!");
  }, [count]);

  useEffect(() => {
    // console.log("컴포넌트가 최초에 한번 화면에 나타났어요!");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCount(data.length);
      });
  }, []);

  const onClick = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  };

  return (
    <div>
      <h1>안녕하세요!</h1>
      <button onClick={onClick}>클릭</button>
      <p>{count}</p>
    </div>
  );
}