const newComment = async (event) => {
  event.preventDefault();

  const comment_text = document.getElementById("new-comment").value.trim();
  const urlToArr = window.location.toString().split("/");
  const post_id = parseInt(urlToArr[urlToArr.length - 1], 10);

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment_text, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
  }
};

document.getElementById("comment-btn").addEventListener("click", newComment);
