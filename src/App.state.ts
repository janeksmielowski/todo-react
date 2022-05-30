import { assign, createMachine } from "xstate";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "./App.gateway";
import { TodoContract } from "./App.types";

interface AppContext {
    todos: TodoContract[];
    editedTodoId?: string;
}

type AppEvent =
    | { type: "CHOOSE_ADD_TODO" }
    | { type: "ADD_TODO", todoText: string }
    | { type: "CHOOSE_DELETE_TODO", todoId: string }
    | { type: "DELETE_TODO" }
    | { type: "CHOOSE_TOGGLE_TODO", todoId: string }
    | { type: "CANCEL" }

const appMachine = createMachine<AppContext, AppEvent>({
    id: "app",
    context: {
        todos: [],
    },
    initial: 'init',
    states: {
        init: {
            invoke: {
                src: getTodos,
                onDone: {
                    target: 'chooseAction',
                    actions: assign({
                        todos: (_, event) => event.data.data,
                    }),
                },
                onError: {
                    target: 'error',
                },
            },
        },
        chooseAction: {
            on: {
                CHOOSE_ADD_TODO: {
                    target: "addTodo",
                },
                CHOOSE_DELETE_TODO: {
                    target: "deleteTodo",
                    actions: assign({
                        editedTodoId: (_, { todoId }) => todoId,
                    }),
                },
                CHOOSE_TOGGLE_TODO: {
                    target: "loadingToggleTodo",
                    actions: assign({
                        editedTodoId: (_, { todoId }) => todoId,
                    }),
                },
            },
        },
        addTodo: {
            on: {
                ADD_TODO: {
                    target: "loadingAddTodo",
                },
                CANCEL: {
                    target: "chooseAction",
                },
            },
        },
        loadingAddTodo: {
            invoke: {
                src: (_, { todoText }: any) => createTodo(todoText),
                onDone: {
                    target: "chooseAction",
                    actions: assign({
                        todos: (_, event) => event.data.data,
                    }),
                },
                onError: {
                    target: "error",
                },
            },
        },
        loadingToggleTodo: {
            invoke: {
                src: (context) => {
                    const doneStatus = context.todos.find(todo => todo.id === context.editedTodoId!)?.done;
                    return doneStatus !== undefined ? toggleTodo(context.editedTodoId!, !doneStatus) : Promise.resolve();
                },
                onDone: {
                    target: "chooseAction",
                    actions: assign({
                        todos: (_, event) => event.data.data,
                    }),
                },
                onError: {
                    target: "error",
                },
            },
        },
        deleteTodo: {
            on: {
                DELETE_TODO: {
                    target: "loadingDeleteTodo",
                },
                CANCEL: {
                    target: "chooseAction",
                },
            },
        },
        loadingDeleteTodo: {
            invoke: {
                src: (context) => deleteTodo(context.editedTodoId!),
                onDone: {
                    target: "chooseAction",
                    actions: assign({
                        todos: (context) => {
                            return context.todos.filter(
                                (todo) => todo.id !== context.editedTodoId
                            );
                        },
                        editedTodoId: (_) => undefined,
                    }),
                },
                onError: {
                    target: "error",
                },
            },
        },
        error: {
            type: "final",
        }
    },
})

export default appMachine;