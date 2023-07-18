const BASE_URL = "http://localhost:8080/api/v1/users";
export const useUserStore = defineStore(
  "user",
  () => {
    // Define reactive state variables
    const userId = ref<string | null>();
    const token = ref<string | null>();
    const role = ref<string | null>();

    const create = async (payload: {
      firstName: string;
      lastName: string;
      password: string;
      passwordConfirm: string;
      email: string;
      username: string;
      gender: string;
      birthDate: Date;
      address: string;
      city: string;
      country: string;
      role: string;
    }) => {
      // Send a POST request to the createUser endpoint with user information
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        body: JSON.stringify(payload),
      });

      // Handle response based on status code
      if (response.ok) {
        // If registration is successful, navigate to the login page
        await navigateTo("/", {
          replace: true,
        });
      } else if (response.status === 409) {
        // If email address is already taken, throw an error
        throw new Error("Email address is already taken");
      }
    };

    // Function for user login
    const login = async (payload: { email: string; password: string }) => {
      // Send a POST request to the login endpoint with user credentials
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      // Handle response based on status code
      if (response.status === 401) {
        throw new Error("Email or password are incorrect");
      } else if (response.status === 200) {
        // Update user state with the received user ID and token
        setUser({ userId: data.userId, token: data.token });
        role.value = data.role;

        // Navigate to the home page
        await navigateTo("/", {
          replace: true,
        });
      }
    };

    // Function for user registration
    const register = async (payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      passwordConfirm: string;
      username: string;
    }) => {
      // Send a POST request to the signup endpoint with user information
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle response based on status code
      if (response.ok) {
        // If registration is successful, navigate to the login page
        await navigateTo("/login", {
          replace: true,
        });
      } else if (response.status === 409) {
        // If email address is already taken, throw an error
        throw new Error("Email address is already taken");
      }
    };

    // Function for user logout
    const logout = async () => {
      if (isAuthenticated()) {
        // Clear user state and remove user ID and token from localStorage
        setUser({
          userId: null,
          token: null,
        });

        // Navigate to the login page
        await navigateTo("/login", {
          replace: true,
        });
      }
    };

    // Function to automatically log in the user based on stored token and userId
    const autoLogin = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        setUser({
          userId: userId,
          token: token,
        });
        return true;
      }
    };

    const update = async (payload: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      gender: string;
      birthDate: Date;
      address: string;
      city: string;
      country: string;
    }) => {
      // Send a PATCH request to the updateMe endpoint with user information
      const response = await fetch(`${BASE_URL}/updateMe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        body: JSON.stringify(payload),
      });
      // Handle response based on status code
      if (response.ok) {
        // If update is successful, navigate to the profile page
        await navigateTo("/profile", {
          replace: true,
        });
      } else if (response.status === 409) {
        // If phone number is already taken, throw an error
        throw new Error("Email is already taken");
      } else {
        throw new Error(response.status.toString());
      }
    };

    const updatePhoto = async (payload: FormData) => {
      // Send a PATCH request to the updatePhoto endpoint with user photo
      const response = await fetch(`${BASE_URL}/updateMe`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        body: payload,
      });
      // Handle response based on status code
      if (response.ok) {
        // If update is successful, navigate to the profile page
        await navigateTo("/profile", {
          replace: true,
        });
      } else {
        throw new Error(response.status.toString());
      }
    };

    // Function to set user state
    const setUser = (payload: {
      userId: string | null;
      token: string | null;
    }) => {
      userId.value = payload.userId;
      token.value = payload.token;
    };

    // Function to check if the user is authenticated
    const isAuthenticated = () => {
      return !!userId.value;
    };

    // Return the reactive state variables and functions
    return {
      userId,
      token,
      role,
      create,
      login,
      register,
      logout,
      update,
      updatePhoto,
      autoLogin,
      isAuthenticated,
    };
  },
  { persist: true }
);
