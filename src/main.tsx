import { useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  createdAt: number;
  dueDate: string | null;
  status: "todo" | "doing" | "done";
};

const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      {
        id: crypto.randomUUID(),
        title: text,
        createdAt: Date.now(),
        dueDate: dueDate || null,
        status: "todo",
      },
      ...todos,
    ]);
    setText("");
    setDueDate("");
  };

  const isOverdue = (t: Todo) =>
    t.dueDate !== null && t.dueDate < today() && t.status !== "done";

  return (
    <div className="wrap">
      <h1>Simple ToDo</h1>

      <div className="addRow">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t.id} className={isOverdue(t) ? "overdue" : ""}>
            {t.title}
            {t.dueDate && <span>（期限: {t.dueDate}）</span>}
            {isOverdue(t) && <strong> 期限切れ</strong>}
          </li>
        ))}
      </ul>
    </div>
  );
}
