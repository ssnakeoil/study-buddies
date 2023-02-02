async function deletePost(event) {
    event.preventDefault();
    const deletePostId = event.target.getAttribute("data-delete-post-id");
    console.log(deletePostId);
  
    if (deletePostId) {
      const response = await fetch(`/api/post/${deletePostId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace("/posts");
      } else {
        console.log(response.statusText);
        alert("You did not write this post!");
      }
    }
  }
  
  const deletePostBtns = document.querySelectorAll(".delete-post");
  deletePostBtns.forEach((btn) => {
    btn.addEventListener("click", deletePost);
  });
  