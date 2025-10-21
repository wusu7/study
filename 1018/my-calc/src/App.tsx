import React, { useState } from "react";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";
import "./App.css";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [prev, setPrev] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [isResultShown, setIsResultShown] = useState(false); // 결과값이 표시되고 있는지 여부

  const handleButtonClick = (value: string) => {
    // 숫자 또는 . 입력
    if (/\d|\./.test(value)) {
      if (value === "." && input.includes(".")) return; // 소수점 중복 방지

      if (isResultShown) {
        setInput(value);
        setResult(""); // 새 계산 시작 시 이전 결과값 초기화
      } else {
        setInput((prev) => prev + value);
      }
      setIsResultShown(false);
      return;
    }

    // 연산자 입력
    if (["+", "-", "*", "/", "%"].includes(value)) {
      if (input === "") {
        // 결과값에 바로 연산자 붙이는 경우
        if (result) {
          setPrev(result);
          setOperator(value);
          setInput("");
          setResult("");
          setIsResultShown(false);
        }
        return;
      }

      if (prev && operator) {
        // 연속된 연산 처리 (e.g., 5 * 2 +)
        try {
          const expression = `${prev}${operator}${input}`;
          const calc = eval(expression);
          setPrev(String(calc));
          setResult(String(calc));
        } catch (err) {
          setResult("Error");
        }
      } else {
        setPrev(input);
      }
      setOperator(value);
      setInput("");
      setIsResultShown(false);
      return;
    }

    // = 계산 실행
    if (value === "=") {
      if (!prev || !operator || !input) return;
      try {
        const expression = `${prev}${operator}${input}`;
        const calc = eval(expression);
        setResult(String(calc));
        setInput(String(calc)); // 결과를 다음 입력값으로도 사용
        setPrev("");
        setOperator("");
        setIsResultShown(true); // 결과가 표시되었음을 알림
      } catch (err) {
        setResult("Error");
      }
      return;
    }

    // C (전체 초기화)
    if (value === "C") {
      setInput("");
      setPrev("");
      setOperator("");
      setResult("");
      setIsResultShown(false);
      return;
    }

    // ← (한 글자 지우기)
    if (value === "←") {
      if (isResultShown) {
        // 결과값 표시 중 backspace 누르면 초기화
        setInput("");
        setResult("");
        setIsResultShown(false);
      } else {
        setInput((prev) => prev.slice(0, -1));
      }
      return;
    }
  };

  // 화면에 표시될 값 결정
  // 1. 현재 입력중인 값이 있으면 그것을 보여준다.
  // 2. 입력중인 값이 없으면, 이전 결과값을 보여준다.
  // 3. 결과값도 없으면, 이전 피연산자(prev)를 보여준다.
  // 4. 모두 없으면 '0'을 보여준다.
  const displayValue = input || result || prev || "0";

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  );
};

export default App;
