<script lang="ts">
	import { todosStore } from '$lib/stores/todo-store';
	import AddTodo from './AddTodo.svelte';
	import Todo from './Todo.svelte';

	type SelectedFilter = 'All' | 'Active' | 'Completed';

	let selectedFilter: SelectedFilter = 'All';

	$: incompleteTodos = $todosStore.filter((todo) => !todo.completed);
	$: completeTodos = $todosStore.filter((todo) => todo.completed);
	$: filteredTodos = () => {
		if (selectedFilter === 'All') {
			return $todosStore;
		} else if (selectedFilter === 'Active') {
			return incompleteTodos;
		}

		return completeTodos;
	};
</script>

<main>
	<h1 class="title">todos</h1>

	<section class="todos">
		<AddTodo />

		{#if $todosStore.length}
			<ul class="todo-list">
				{#each filteredTodos() as todo}
					<Todo {todo} />
				{/each}
			</ul>

			<div class="actions">
				<span class="todo-count">{incompleteTodos.length} left</span>
				<div class="filters">
					<button
						class="filter"
						class:selected={(selectedFilter === 'All')}
						on:click={() => (selectedFilter = 'All')}>All</button
					>
					<button
						class="filter"
						on:click={() => (selectedFilter = 'Active')}
						class:selected={(selectedFilter === 'Active')}>Active</button
					>
					<button
						class="filter"
						on:click={() => (selectedFilter = 'Completed')}
						class:selected={(selectedFilter === 'Completed')}>Completed</button
					>
				</div>
				<button class="clear-completed" on:click={todosStore.clearCompletedTodos}
					>Clear completed</button
				>
			</div>
		{/if}
	</section>
</main>

<style>
	/* Todos */

	.title {
		font-size: var(--font-80);
		font-weight: inherit;
		text-align: center;
		color: var(--color-title);
	}

	.todos {
		--width: 500px;
		--todos-bg: hsl(0 0% 98%);
		--todos-text: hsl(220 20% 14%);

		width: var(--width);
		color: var(--todos-text);
		background-color: var(--todos-bg);
		border-radius: var(--radius-base);
		border: 1px solid var(--color-gray-90);
		box-shadow: 0 0 4px var(--shadow-1);
	}

	.todo-list {
		list-style: none;
	}

	.actions {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-8) var(--spacing-16);
		font-size: 0.9rem;
		border-top: 1px solid var(--color-gray-90);
	}

	.actions:before {
		content: '';
		height: 40px;
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		box-shadow:
			0 1px 1px hsla(0, 0%, 0%, 0.2),
			0 8px 0 -3px hsl(0, 0%, 96%),
			0 9px 1px -3px hsla(0, 0%, 0%, 0.2),
			0 16px 0 -6px hsl(0, 0%, 96%),
			0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
		z-index: -1;
	}

	/* Filters */

	.filters {
		display: flex;
		gap: var(--spacing-4);
	}

	.filter {
		text-transform: capitalize;
		padding: var(--spacing-4) var(--spacing-8);
		border: 1px solid transparent;
		border-radius: var(--radius-base);
	}

	.filter:hover {
		border: 1px solid var(--color-highlight);
	}

	.selected {
		border-color: var(--color-highlight);
	}
</style>
