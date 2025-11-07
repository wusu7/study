import { useRef, useEffect, useState } from "react";

export default function InputFocusExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    renderCount.current++;
  });

  return (
    <div className="p-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="입력하세요"
        className="border p-2"
      />
      <input
        ref={buttonRef}
        type="text"
        placeholder="입력하세요2"
        className="border p-2"
      />
      <button onClick={handleFocus} className="btn btn-primary">
        포커스
      </button>

      <p>카운트 횟수: {count}</p>
      <p>렌더링 횟수: {renderCount.current}</p>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="btn btn-primary"
      >
        클릭
      </button>
    </div>
  );
}