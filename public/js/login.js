const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // const data = await response.json()
    // console.log(data)

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
