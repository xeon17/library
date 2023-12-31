export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user"); // get token from cookies

  // Check if user is authenticated
  const isAuth = user.value.role === "Librarian" || user.value.role === "Admin";

  // If the user is not authenticated and trying to access the add librarian route
  if (!isAuth) {
    abortNavigation(); // Abort the current navigation
    return navigateTo("/students"); // Redirect to the librarians route
  }
});
