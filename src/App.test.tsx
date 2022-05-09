/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Todo } from './App.state';
import TodoContainer from './TodoContainer';
import App from './App';

const MOCKED_TODOS: Todo[] = [
  { id: 0, text: 'Do the shopping', completed: false },
  { id: 1, text: 'Go to the gym', completed: false },
  { id: 2, text: 'Learn for the exam', completed: false },
];

it('should render todos', () => {
  const { getByText } = render(
    <TodoContainer
      todos={MOCKED_TODOS}
      handleChecked={() => {}}
      handleDelete={() => {}}
    />
  );

  MOCKED_TODOS.forEach((todo) => {
    expect(getByText(todo.text)).toBeInTheDocument();
  });
});

it('should render no todos', () => {
  const { getByText } = render(
    <TodoContainer
      todos={[]}
      handleChecked={() => {}}
      handleDelete={() => {}}
    />
  );

  expect(getByText('No todos yet')).toBeInTheDocument();
});

it('should add new todo', async () => {
  const { findByTestId, getAllByTestId, getByTestId, queryAllByTestId } = render(<App/>);

  const openAddTodoModalButton = getByTestId('open-add-todo-modal-button');
  fireEvent.click(openAddTodoModalButton);

  const addTodoModalContent = await findByTestId('add-todo-modal-content');
  expect(addTodoModalContent).toBeInTheDocument();

  const input = getByTestId('add-todo-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'New todo' } });

  const addTodoButton = getByTestId('add-todo-submit-button') as HTMLButtonElement;
  fireEvent.click(addTodoButton);

  await waitFor(() => expect(addTodoModalContent).not.toBeInTheDocument());
  await waitFor(() => expect(queryAllByTestId('todo')).toHaveLength(4));

  const todos = getAllByTestId('todo');
  expect(todos[todos.length - 1]).toHaveTextContent('New todo');
});

it('should delete todo', async () => {
  const { findByTestId, getAllByTestId, getByTestId, queryAllByTestId } = render(<App/>);

  const openDeleteTodoModalButton = getAllByTestId('open-delete-todo-modal-button')[0];
  fireEvent.click(openDeleteTodoModalButton);

  const deleteTodoModalContent = await findByTestId('delete-todo-modal-content');
  expect(deleteTodoModalContent).toBeInTheDocument();

  const deleteTodoButton = getByTestId('delete-todo-submit-button') as HTMLButtonElement;
  fireEvent.click(deleteTodoButton);

  await waitFor(() => expect(deleteTodoModalContent).not.toBeInTheDocument());
  await waitFor(() => expect(queryAllByTestId('todo')).toHaveLength(2));
});

it('should check todo', async () => {
  const { getAllByTestId, queryAllByTestId } = render(<App/>);

  const checkbox = getAllByTestId('todo-checkbox')[0];
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  await waitFor(() => expect(queryAllByTestId('todo-checkbox')[0]).toBeChecked());

  fireEvent.click(checkbox);
  await waitFor(() => expect(queryAllByTestId('todo-checkbox')[0]).not.toBeChecked());
});
