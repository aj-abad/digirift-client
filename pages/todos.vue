<template>
  <div
    class="d-flex align-center justify-center bg-blue-grey-lighten-5 h-100 w-100 overflow-hidden">
    <VSheet class="pa-4 bg-white rounded-lg border" id="todos-sheet">
      <div class="d-flex justify-center" v-if="loading">
        <VProgressCircular indeterminate color="teal-darken-4" />
      </div>
      <div v-else>
        <div v-if="result?.me">
          <h1 class="mb-4">{{ userName }}'s Todos</h1>
          <TodoItems @update="resync" :items="result.me.tasks" />
        </div>
        <div v-else>
          <VAlert type="error" class="mb-4" variant="tonal" border="start">
            {{ errorMessage || "Cannot fetch todos, please try again later." }}
          </VAlert>
        </div>
      </div>
      <div class="mt-4">
        <LogoutBtn />
      </div>
    </VSheet>
  </div>
</template>

<script setup lang="ts">
const meQuery = gql`
  query Me {
    me {
      id
      name
      email
      tasks {
        id
        name
        status
      }
    }
  }
`;

onMounted(() => {
  if (!localStorage.getItem("token")) {
    useRouter().replace("/");
  }
});

const { result, loading, error, refetch } = useQuery(meQuery);
const userName = computed(() => result?.value?.me?.name);
const errorMessage = computed(() => error.value?.graphQLErrors?.map((e) => e.message).join(", "));

const resync = async () => {
  await refetch();
  localStorage.setItem("todos", JSON.stringify(result?.value?.me?.tasks));
};
</script>

<style lang="scss">
#todos-sheet {
  width: 32rem;
}
</style>
