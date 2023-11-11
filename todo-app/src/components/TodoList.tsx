import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>('');

  const addTodo = () => {
    if (todo) {
      setTodos([...todos, todo]);
      setTodo('');
    }
  };

  const removeTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
