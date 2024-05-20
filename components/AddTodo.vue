<template>
  <div>
    <VAlert v-if="errorMessage" type="error" class="mb-4" variant="tonal" border="start" closable>
      {{ errorMessage }}
    </VAlert>
    <form @submit.prevent="addTask({ name })" class="d-flex">
      <VTextField :disabled="loading" v-model="name" label="Add new task" variant="underlined" />
      <VBtn
        :disabled="loading || !name"
        type="submit"
        variant="text"
        icon="mdi-plus"
        color="teal-darken-4"
        aria-label="Add task" />
    </form>
  </div>
</template>

<script setup lang="ts">
const name = ref("");

const createTaskMutation = gql`
  mutation CreateTask($name: String!) {
    createTask(name: $name) {
      id
      name
      status
    }
  }
`;
const { mutate: addTask, onDone, loading, error } = useMutation(createTaskMutation);
const errorMessage = computed(() => error.value?.graphQLErrors?.map((e) => {
  if (e.extensions?.validation) {
    return Object.values(e.extensions?.validation).join(", ");
  }
  return e.message;
}).join(", "));

const emit = defineEmits(["add"]);

onDone(() => {
  name.value = "";
  emit("add");
});
</script>
