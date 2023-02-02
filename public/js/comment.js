async function addComment(event) {
    event.preventDefault();
  
    const commentText = event.target.parentNode
      .querySelector("#comment-text")
      .value.trim();
    const postId = event.target.getAttribute("data-post-id");
  
  
    if (commentText && postId) {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: commentText,
          post_id: postId,
        }),
      });
  
      console.log("RES:", response);
  
      if (response.ok) {
        document.location.replace("/posts");
      } else {
        console.log(response.statusText);
        alert(response.statusText);
      }
    }
  }
  
  const addCommentBtns = document.querySelectorAll(".addComment");
  addCommentBtns.forEach((button) => {
    button.addEventListener("click", addComment);
  });
  
  async function removeComment(event) {
    event.preventDefault();
    const deleteCommentId = event.target.getAttribute("data-comment-id");
    console.log(deleteCommentId);
  
    if (deleteCommentId) {
      const response = await fetch(`/api/comment/${deleteCommentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace("/posts");
      } else {
        console.log(response.statusText);
        alert('You did not write this comment!');
      }
    }
  }
  
  const removeCommentBtns = document.querySelectorAll(".removeComment");
  removeCommentBtns.forEach((btn) => {
    btn.addEventListener("click", removeComment);
  });
  