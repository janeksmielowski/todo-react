/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render } from '@testing-library/react';
import { TodoContract } from './App.types';
import TodoContainer from './TodoContainer';

const MOCKED_TODOS: TodoContract[] = [
  { id: '29242699-5914-4a00-b1ac-1e0113a7a802', text: 'Do the shopping', done: false },
  { id: '728785f1-010a-4870-9e91-9823aec75b40', text: 'Go to the gym', done: false },
  { id: '9665821d-eaf4-41e7-98cb-e15a10fa096c', text: 'Learn for the exam', done: false },
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
