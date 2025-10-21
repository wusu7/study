import React from "react";

type DisplayProps = {
  value: string; // 현재 표시할 값 (입력 중이거나 계산 결과)
};

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="display">
      {value || "0"}
    </div>
  );
};

export default Display;
