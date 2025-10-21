// 17. 최종 단계: App.tsx 파일에서 생성한 계산기 컴포넌트 불러오기
import React from 'react';
import './App.css';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      {/* 18. 화면에 계산기 컴포넌트 렌더링 */}
      <Calculator />
    </div>
  );
}

export default App;

