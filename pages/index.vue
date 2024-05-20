<template>
  <div
    class="d-flex align-center justify-center bg-blue-grey-lighten-5 h-100 w-100 overflow-hidden">
    <VSheet class="pa-4 bg-white rounded-lg border" id="login-sheet">
      <h1 class="mb-4">Login to continue</h1>
      <VAlert v-if="errorMessage" type="error" class="mb-4" variant="tonal" border="start">
        {{ errorMessage }}
      </VAlert>
      <form @submit.prevent="() => login({ email, password })" class="d-flex gap-2 flex-column">
        <VTextField variant="underlined" v-model="email" type="email" label="Email" outlined />
        <VTextField
          variant="underlined"
          v-model="password"
          label="Password"
          outlined
          type="password" />
        <VBtn
          :aria-busy="loading"
          aria-label="Login"
          :disabled="loading || !email || !password"
          type="submit"
          variant="flat"
          color="teal-darken-4">
          <span v-if="!loading">Login</span>
          <span v-else>
            <VProgressCircular indeterminate color="white" size="24" />
          </span>
        </VBtn>
      </form>
    </VSheet>
  </div>
</template>

<script setup lang="ts">
import { VAlert } from "vuetify/components";

onMounted(() => {
  if (localStorage.getItem("token")) {
    useRouter().replace("/todos");
  }
});

const email = ref("");
const password = ref("");

const query = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

const { mutate: login, onDone, error, loading } = useMutation(query);

onDone((data) => {
  const { token } = data?.data?.login || {};
  if (!token) return;
  localStorage.setItem("token", token);
  useRouter().replace("/todos");
});

const errorMessage = computed(() => error.value?.graphQLErrors?.map((e) => e.message).join(", "));
</script>

<style lang="scss">
#login-sheet {
  width: 32rem;
}
</style>
