<script>
	import TodoList from './TodoList.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte todo app" />
</svelte:head>

<section>
  <TodoList />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    background-color: #808080;
    height: 100svh;
	}
</style>
