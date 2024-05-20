export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    const tokenVal = localStorage.getItem("token");
    if (tokenVal) {
      token.value = tokenVal;
    }
  });
});
