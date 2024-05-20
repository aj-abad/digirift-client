<template>
  <div class="d-flex ga-4 align-center">
    <div>
      <VBtn
        variant="text"
        :icon="status === 'todo' ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked'"
        color="teal-darken-4"
        @click="() => emit('toggle')"
        :disabled="props.loading"
        aria-label="Toggle status" />
    </div>
    <div>
      <span class="font-weight-medium" :class="status === 'done' && 'text-decoration-line-through'">
        {{ props.name }}
      </span>
    </div>
    <div class="ml-auto">
      <VBtn
        @click="deleteTask"
        size="small"
        variant="text"
        icon="mdi-delete-outline"
        color="red"
        :disabled="props.loading"
        aria-label="Delete" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  name: string;
  status: string;
  loading: boolean;
}>();

const emit = defineEmits(["toggle", "delete"]);

const deleteTask = () => {
  const isConfirmed = confirm("Are you sure you want to delete this task?");
  if (!isConfirmed) return;
  emit("delete");
};
</script>
