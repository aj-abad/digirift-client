<template>
  <VBtn aria-label="Logout" variant="flat" color="red" @click="logoutFireAndForget" block>
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
const { mutate: logout } = useMutation(logoutMutation);

const logoutFireAndForget = async () => {
  logout(); // fire and forget so we can sign out offline
  localStorage.removeItem("token");
  useRouter().replace("/");
};
</script>
