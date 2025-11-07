
import { useState, useDeferredValue, useMemo } from "react";

function SlowList({ text }: { text: string }) {
  // 느린 연산 시뮬레이션
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 20000; i++) {
      list.push(<div key={i}>{text}</div>);
    }
    return list;
  }, [text]);

  return <div>{items}</div>;
}

export default function DeferredValueExample() {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input);

  return (
    <div className="p-4 space-y-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded"
        placeholder="검색어를 입력하세요"
      />
      <p className="text-gray-500">현재 입력값: {input}</p>
      <p className="text-gray-500">지연된 값: {deferredInput}</p>

      {/* deferredInput을 사용하는 느린 리스트 */}
      <SlowList text={deferredInput} />
    </div>
  );
}
