import { useId } from "react";

export default function UseIdExample() {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  return (
    <div className="p-4">
      <label htmlFor={nameId}>이름</label>
      <input
        id={nameId}
        type="text"
        placeholder="입력하세요"
        className="border p-2"
      />
      <label htmlFor={emailId}>이메일</label>
      <input
        id={emailId}
        type="text"
        placeholder="입력하세요"
        className="border p-2"
      />
      <label htmlFor={passwordId}>비밀번호</label>
      <input
        id={passwordId}
        type="text"
        placeholder="입력하세요"
        className="border p-2"
      />
    </div>
  );
}