import { observable } from "mobx";

export const store = observable({
  todos: [
    { id: Math.random(), text: "Buy eggs", completed: true },
    { id: Math.random(), text: "Write a post", completed: false },
    { id: Math.random(), text: `Read a post`, completed: false }
  ],
  toggleTodo(id) {
    store.todos[id].completed = !store.todos[id].completed;
  },
  get remainingTodos() {
    return store.todos.filter(t => !t.completed).length;
  }
});
