// 1. 기본 React 컴포넌트 구조 설정
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  // 2. 계산기 상태 관리
  // displayValue: 화면에 표시될 값
  // firstOperand: 첫 번째 피연산자
  // operator: 선택된 연산자
  // waitingForSecondOperand: 두 번째 피연산자 입력 대기 상태 여부
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // 3. 숫자 입력 처리 함수
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  // 4. 소수점 입력 처리 함수
  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // 5. 연산자 처리 함수
  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // 6. 계산 실행 함수
  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  // 7. 초기화(AC) 처리 함수
  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // 8. 등호(=) 처리 함수
  const handleEqual = () => {
    if (operator && firstOperand !== null) {
      const inputValue = parseFloat(displayValue);
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  // 9. UI 렌더링
  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button onClick={clearAll}>AC</button>
            <button>+/-</button>
            <button>%</button>
          </div>
          <div className="digit-keys">
            <button onClick={() => inputDigit('7')}>7</button>
            <button onClick={() => inputDigit('8')}>8</button>
            <button onClick={() => inputDigit('9')}>9</button>
            <button onClick={() => inputDigit('4')}>4</button>
            <button onClick={() => inputDigit('5')}>5</button>
            <button onClick={() => inputDigit('6')}>6</button>
            <button onClick={() => inputDigit('1')}>1</button>
            <button onClick={() => inputDigit('2')}>2</button>
            <button onClick={() => inputDigit('3')}>3</button>
            <button onClick={() => inputDigit('0')} className="zero">0</button>
            <button onClick={inputDecimal}>.</button>
          </div>
        </div>
        <div className="operator-keys">
          <button onClick={() => performOperation('/')}>÷</button>
          <button onClick={() => performOperation('*')}>×</button>
          <button onClick={() => performOperation('-')}>−</button>
          <button onClick={() => performOperation('+')}>+</button>
          <button onClick={handleEqual}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
