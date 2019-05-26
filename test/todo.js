import React, { useRef } from 'react';
import store, { createStore, useStore } from '../src/index';

const sleep = async t => new Promise(resolve => setTimeout(resolve, t));

const TodoStore = createStore({
  namespace: 'TodoStore',
  id: 0,
  todos: [
    {
      id: 0,
      content: 'first',
      status: 'DOING',
    },
  ],
  addTodo(content) {
    this.id++;
    const todo = {
      id: this.id,
      content,
      status: 'DOING',
    };
    this.todos.push(todo);
  },
  getTodoById(id) {
    return this.todos.filter(item => item.id === id)[0];
  },
  updateTodo(id, status) {
    const todo = this.getTodoById(id);
    if (!todo) return;
    todo.status = status;
  },
  // test async function
  incId: 0,
  async delayIncId() {
    await sleep(1000 * 3);
    this.incId++;
  },
});

export default () => {
  /**
   * 获取 TodoStore 的几种方式：
   * const { TodoStore } = useStore(); // 更符合 React Hooks 的理念
   * const { TodoStore } = store;
   * const { TodoStore } = TodoStore.useStore();
   */
  const { TodoStore } = store;
  const inputEl = useRef(null);
  const handleClick = item => {
    if (item.status === 'DOING') {
      TodoStore.updateTodo(item.id, 'COMPLETED');
    } else if (item.status === 'COMPLETED') {
      TodoStore.updateTodo(item.id, 'DOING');
    }
  };
  const handleAddTodo = () => {
    console.warn('set data within component, should be got console.error : ');
    TodoStore.todos[0].id = 1000;
    const text = inputEl.current.value;
    if (text) {
      TodoStore.addTodo(text);
    }
  };
  console.log('render', 'totos.length:' + TodoStore.todos.length);
  return (
    <div>
      <div data-testid="incid">{TodoStore.incId}</div>
      {!TodoStore.delayIncId.loading ? <div data-testid="incidfinish" /> : ''}

      <div data-testid="incidloading">{TodoStore.delayIncId.loading ? 'loading' : 'completed'}</div>
      <div data-testid="todocount">{TodoStore.todos.length}</div>
      <ul data-testid="todolist">
        {TodoStore.todos.map(item => {
          return (
            <li onClick={() => handleClick(item)} key={item.id}>
              {item.content}
              <span>{item.status}</span>
            </li>
          );
        })}
      </ul>
      <input ref={inputEl} data-testid="todoinput" type="text" />
      <button data-testid="todobtn" onClick={() => handleAddTodo()}>
        add todo
      </button>

      <button data-testid="incbtn" onClick={() => TodoStore.delayIncId()}>
        delay inc id
      </button>
    </div>
  );
};
