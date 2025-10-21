import React from "react";

type ButtonProps = {
  label: string; // 버튼에 표시될 글자
  onClick: (value: string) => void; // 클릭 시 부모로 전달할 함수
  className?: string; // 색상 구분용 클래스 (예: red, green 등)
};

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button
      className={`button ${className ? className : ""}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}
