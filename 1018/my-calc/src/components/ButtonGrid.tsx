import React from "react";
import Button from "./Button";

type ButtonGridProps = {
  onButtonClick: (value: string) => void; // App에서 전달받은 클릭 핸들러
};

const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonClick }) => {
  // 버튼 배열 정의
  const buttons = [
    "C", "←", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=",
  ];

  return (
    <div className="buttons">
      {buttons.map((label) => {
        // 색상 분기
        let className = "";
        if (["C", "←", "%", "/", "*", "-", "+"].includes(label)) className = "red";
        if (label === "=") className = "green";
        if (label === "0") className += " double-width"; // 0 버튼을 위한 추가 클래스

        return (
          <Button
            key={label}
            label={label}
            className={className}
            onClick={onButtonClick}
          />
        );
      })}
    </div>
  );
};

export default ButtonGrid;
