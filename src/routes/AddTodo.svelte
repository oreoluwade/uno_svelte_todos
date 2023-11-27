<script lang="ts">
	import { todosStore } from '$lib/stores/todo-store';

	let localTodoTitle = '';

	const handleSubmit = () => {
		todosStore.addNewTodo(localTodoTitle);
		localTodoTitle = '';
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	{#if $todosStore.length > 0}
		<input
			type="checkbox"
			id="toggle-all"
			class="toggle-all"
			on:click={todosStore.toggleCompleted}
		/>
		<label aria-label="Mark all as complete" for="toggle-all"> Mark all as complete </label>
	{/if}

	<!-- svelte-ignore a11y-autofocus -->
	<input
		id="new-todo"
		class="new-todo"
		placeholder="What needs to be done?"
		type="text"
		autofocus
		bind:value={localTodoTitle}
	/>
</form>

<style>
	/* Add todo */

	.toggle-all {
		width: 1px;
		height: 1px;
		position: absolute;
		opacity: 0;
	}

	.toggle-all + label {
		position: absolute;
		font-size: 0;
	}

	.toggle-all + label:before {
		content: '❯';
		display: block;
		padding: var(--spacing-16);
		font-size: var(--font-24);
		color: var(--color-gray-58);
		transform: rotate(90deg);
	}

	.toggle-all:checked + label:before {
		color: var(--color-gray-28);
	}

	.new-todo {
		width: 100%;
		padding: var(--spacing-16);
		padding-left: 60px;
		font-size: var(--font-24);
		border: none;
		border-bottom: 1px solid var(--shadow-1);
	}
</style>
