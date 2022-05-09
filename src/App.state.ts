import { assign, createMachine } from "xstate";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface AppContext {
    nextTodoId: number;
    todos: Todo[];
    deleteTodoId?: number;
}

type AppEvent =
    | { type: "CHOOSE_ADD_TODO" }
    | { type: "ADD_TODO", todoText: string }
    | { type: "CHOOSE_DELETE_TODO", todoId: number }
    | { type: "DELETE_TODO" }
    | { type: "CANCEL" }
    | { type: "TOGGLE_TODO", todoId: number }

const INITIAL_TODOS: Todo[] = [
    { id: 0, text: 'Do the shopping', completed: false },
    { id: 1, text: 'Go to the gym', completed: false },
    { id: 2, text: 'Learn for the exam', completed: false },
];

const appMachine = createMachine<AppContext, AppEvent>({
    id: "app",
    context: {
        nextTodoId: INITIAL_TODOS.length,
        todos: INITIAL_TODOS,
    },
    initial: 'chooseAction',
    states: {
        chooseAction: {
            on: {
                CHOOSE_ADD_TODO: {
                    target: "addTodo",
                },
                CHOOSE_DELETE_TODO: {
                    target: "deleteTodo",
                    actions: assign({
                        deleteTodoId: (_, { todoId }) => todoId,
                    }),
                },
                TOGGLE_TODO: {
                    target: "chooseAction",
                    actions: assign({
                        todos: (context, { todoId }) => {
                            debugger
                            return context.todos.map(todo => {
                                if (todo.id === todoId) {
                                    return { ...todo, completed: !todo.completed };
                                }
                                return todo;
                            });
                        },
                    }),
                },
            },
        },
        addTodo: {
            on: {
                ADD_TODO: {
                    target: "chooseAction",
                    actions: assign({
                        todos: (context, { todoText }) => {
                            const todo = {
                                id: context.nextTodoId,
                                text: todoText,
                                completed: false,
                            };
                            return [...context.todos, todo];
                        },
                        nextTodoId: (context) => context.nextTodoId + 1,
                    }),
                },
                CANCEL: {
                    target: "chooseAction",
                },
            },
        },
        deleteTodo: {
            on: {
                DELETE_TODO: {
                    target: "chooseAction",
                    actions: assign({
                        todos: (context) => {
                            return context.todos.filter(
                                (todo) => todo.id !== context.deleteTodoId
                            );
                        },
                    }),
                },
                CANCEL: {
                    target: "chooseAction",
                },
            },
        },
    },
})

export default appMachine;