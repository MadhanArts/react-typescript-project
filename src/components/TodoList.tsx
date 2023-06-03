import React, { FC } from "react";
import { Todo } from "../model";
import "./styles.css";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const handleTodoEdit = (todoText: string, id: number) => {
    const todosTemp = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: todoText } : todo
    );
    setTodos(todosTemp);
  };

  const deleteTodo = (id: number) => {
    const todosTemp = todos.filter((todo) => todo.id !== id);
    setTodos(todosTemp);
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "draggingOver" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <TodoItem
                index={index}
                key={todo.id}
                todo={todo}
                handleTodoEdit={handleTodoEdit}
                deleteTodo={deleteTodo}
                handleDone={handleDone}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "draggingOver" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <TodoItem
                index={index}
                key={todo.id}
                todo={todo}
                handleTodoEdit={handleTodoEdit}
                deleteTodo={deleteTodo}
                handleDone={handleDone}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
