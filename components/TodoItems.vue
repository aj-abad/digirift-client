<template>
  <ul style="list-style-type: none" class="d-flex flex-column ga-2">
    <li v-for="item in props.items" :key="item.id">
      <TodoItem
        :id="item.id"
        :name="item.name"
        :status="item.status"
        :loading="[updating, deleting].some(Boolean)"
        @toggle="updateTask({ id: item.id, status: item.status === 'done' ? 'todo' : 'done' })"
        @delete="deleteTask({ id: item.id })" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: {
    id: string;
    name: string;
    status: string;
  }[];
}>();

const emit = defineEmits(["update"]);

const updateMutation = gql`
  mutation UpdateTask($id: ID!, $status: String!) {
    updateTask(id: $id, status: $status) {
      id
      status
    }
  }
`;

const deleteMutation = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const {
  mutate: updateTask,
  loading: updating,
  onDone: onTaskUpdated,
} = useMutation(updateMutation);

onTaskUpdated(() => {
  emit("update");
});

const {
  mutate: deleteTask,
  loading: deleting,
  onDone: onTaskDeleted,
} = useMutation(deleteMutation);

onTaskDeleted(() => {
  emit("update");
});
</script>
