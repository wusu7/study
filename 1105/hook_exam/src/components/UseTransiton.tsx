import { useState, useTransition, useMemo } from "react";

function SlowList({ text }: { text: string }) {
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 20000; i++) {
      list.push(<div key={i}>{text}</div>);
    }
    return list;
  }, [text]);

  return <div>{items}</div>;
}

export default function UseTransitionExample() {
  const [text, setText] = useState("");
  const [listText, setListText] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setText(input); // ✅ 즉시 반응 (높은 우선순위)
    startTransition(() => {
      setListText(input); // 🕓 지연된 렌더링 (낮은 우선순위)
    });
  };

  return (
    <div className="p-4 space-y-3">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="검색어를 입력하세요"
      />
      {isPending && <p className="text-gray-400">렌더링 중...</p>}

      <SlowList text={listText} />
    </div>
  );
}