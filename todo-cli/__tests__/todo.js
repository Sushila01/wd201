const todoList = require('../todo');

describe('Todo List Tests', () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test('should create a new todo', () => {
    todos.add({ title: 'New Task', dueDate: '2023-10-10', completed: false });
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe('New Task');
  });

  test('should mark a todo as completed', () => {
    todos.add({ title: 'Task', dueDate: '2023-10-10', completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test('should retrieve overdue items', () => {
    todos.add({
      title: 'Overdue Task',
      dueDate: '2023-01-01',
      completed: false,
    });
    expect(todos.overdue().length).toBe(1);
  });

  test('should retrieve due today items', () => {
    const today = new Date().toISOString().split('T')[0];
    todos.add({ title: 'Due Today', dueDate: today, completed: false });
    expect(todos.dueToday().length).toBe(1);
  });

  test('should retrieve due later items', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    todos.add({ title: 'Due Later', dueDate: tomorrow, completed: false });
    expect(todos.dueLater().length).toBe(1);
  });
});
