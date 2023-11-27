import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Todo = {
	title: string;
	completed: boolean;
	id: string;
};

const storeLocalStorage: Todo[] | null = browser
	? JSON.parse(localStorage.getItem('mitodos') as string)
	: [];

const INITIAL_TODOS: Todo[] = storeLocalStorage ?? [];

const generateRandomId = () => {
	return Math.random().toString(16).slice(2);
};

const createTodosStore = () => {
	const { subscribe, set, update } = writable(INITIAL_TODOS);

	subscribe((todos) => {
		if (browser) {
			localStorage.setItem('mitodos', JSON.stringify(todos));
		}
	});

	const addNewTodo = (incomingTitle: string) => {
		const newTodo: Todo = {
			id: generateRandomId(),
			completed: false,
			title: incomingTitle
		};
		update((todos) => {
			todos = [newTodo, ...todos];
			return todos;
		});
	};

	const markTodoAsComplete = (todoId: string) => {
		update((todos) => {
			todos = todos.map((todo) => {
				if (todo.id === todoId) {
					todo.completed = !todo.completed;
				}
				return todo;
			});
			return todos;
		});
	};

	const editTodo = (todoId: string, newTodoText: string) => {
		update((todos) => {
			todos = todos.map((todo) => {
				if (todo.id === todoId) {
					todo.title = newTodoText;
				}
				return todo;
			});
			return todos;
		});
	};

	const deleteTodo = (todoId: string) => {
		update((todos) => {
			todos = todos.filter((todo) => todo.id !== todoId);
			return todos;
		});
	};

	const toggleCompleted = (event: MouseEvent): void => {
		const { checked } = event.target as HTMLInputElement;

		update((todos) => {
			todos = todos.map((todo) => ({
				...todo,
				completed: checked
			}));
			return todos;
		});
	};

	const clearCompletedTodos = () => {
		update((todos) => {
			todos = todos.filter((todo) => !todo.completed);
			return todos;
		});
	};

	const resetTodos = () => {
		set(INITIAL_TODOS);
	};

	return {
		subscribe,
		addNewTodo,
		deleteTodo,
		resetTodos,
		toggleCompleted,
		markTodoAsComplete,
		editTodo,
		clearCompletedTodos
	};
};

export const todosStore = createTodosStore();
