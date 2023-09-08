const editPost = async (e) => {
  e.preventDefault();

  const title = document.getElementById("edit-title").value.trim();
  const content = document.getElementById("edit-content").value.trim();

  const postId = window.location.toString().split("/");
  const id = parseInt(postId[postId.length - 1], 10);
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post could not be updated.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occured while updating the post.");
  }
};

const deletePost = async (e) => {
  e.preventDefault();

  const postId = window.location.toString().split("/");
  const id = parseInt(postId[postId.length - 1], 10);
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post could not be deleted.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occured while deleting the post.");
  }
};

document.getElementById("edit-btn").addEventListener("click", editPost);
document.getElementById("delete-btn").addEventListener("click", deletePost);
