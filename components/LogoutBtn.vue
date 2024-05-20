<template>
  <VBtn :disabled="loading" aria-label="Logout" variant="text" color="red" @click="logout" block>
    Logout
  </VBtn>
</template>

<script setup lang="ts">
const logoutMutation = gql`
  mutation Logout {
    logout {
      status
    }
  }
`;
const { mutate: logout, onDone, loading } = useMutation(logoutMutation);

onDone((_, context) => {
  context.client.clearStore();
  localStorage.removeItem("token");
  localStorage.removeItem("todos");
  useRouter().replace("/");
});
</script>
