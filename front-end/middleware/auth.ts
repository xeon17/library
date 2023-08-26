export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user"); // get token from cookies

  // Check if user is authenticated
  const isAuth: boolean = !!(user && user.value && user.value.userId);

  // If the user is authenticated and trying to access the login or register routes
  if (
    isAuth &&
    (to?.name.startsWith("login") || to?.name.startsWith("registration"))
  ) {
    if (from?.name !== "/") {
      return navigateTo("/"); // Navigate to the home route
    }
  }

  // If the user is not authenticated and trying to access routes other than login or register
  if (
    !isAuth &&
    !to?.name?.startsWith("login") &&
    !to?.name?.startsWith("registration")
  ) {
    abortNavigation(); // Abort the current navigation
    return navigateTo("/login"); // Redirect to the login route
  }
});
