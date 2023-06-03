import React, { FC, useEffect, useRef, useState } from "react";
import { Todo } from "../model";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  handleTodoEdit: (todoText: string, id: number) => void;
  deleteTodo: (id: number) => void;
  handleDone: (id: number) => void;
}

const TodoItem: FC<Props> = ({
  index,
  todo,
  handleTodoEdit,
  deleteTodo,
  handleDone,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editText, setEditText] = useState(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo_item ${snapshot.isDragging ? "dragging" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            handleTodoEdit(editText, todo.id);
            setEditMode(false);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editMode ? (
            <input
              className="todo_item--text"
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span className={`todo_item--text ${todo.isDone ? "strike" : ""}`}>
              {todo.todo}
            </span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!editMode && !todo.isDone) {
                  setEditMode(!editMode);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => deleteTodo(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
