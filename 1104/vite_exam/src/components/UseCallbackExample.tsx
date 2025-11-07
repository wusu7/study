import { useState, memo, useCallback } from "react";

function Child({ onClick }: { onClick: () => void }) {
  console.log("Child 랜더링");
  return (
    <button className="btn btn-primary" onClick={onClick}>
      자식 버튼 클릭
    </button>
  );
}

const MemoizedChild = memo(Child);

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("handleClick 호출");
    setCount(count + 1);
  }, [count]);

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">useCallback 예제</h2>
      <p>결과: {count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="btn btn-primary"
      >
        증가
      </button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}