// Function to check if the user is logged in
export const isLoggedIn = () => {
    return !!localStorage.getItem("token"); // Checks if a token exists
  };
  
  // Function to log out the user
  export const logout = () => {
    localStorage.removeItem("token"); // Removes token from storage
    window.location.href = "/login"; // Redirect to login page
  };
  