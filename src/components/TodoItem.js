import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo.id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(todo.title);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
            className="todo-edit-input"
          />
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </>
      ) : (
        <>
          <span onClick={toggleComplete}>{todo.title}</span>
          <button onClick={handleEdit} className="edit-button">Edit</button>
          <button onClick={deleteTodo} className="delete-button">Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
