import Counter from "../components/Counter";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <div>
      <h1>홈</h1>
      <Counter />
      <TodoList />
    </div>
  );
}