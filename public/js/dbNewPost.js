const dbNewPost = async (event) => {
  event.preventDefault();

  const title = document.getElementById("db-post-title").value.trim();
  const content = document.getElementById("db-post-content").value.trim();

  if (title && content) {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(`Post was not be created.`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert(`An error occured while creating the post.`);
    }
  } else {
    alert("Please enter a title and content for the post.");
  }
};

document.getElementById("db-newpost-btn").addEventListener("click", dbNewPost);
