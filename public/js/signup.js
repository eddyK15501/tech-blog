const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(data.error);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
