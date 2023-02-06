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
        document.location.replace("/userpost");
      } else {
        console.log(response.statusText);
        alert("error");
      }
    }
  }
  
  const deletePostBtns = document.querySelectorAll(".delete-post");
  deletePostBtns.forEach((btn) => {
    btn.addEventListener("click", deletePost);
  });


  async function deleteFlash(event) {
    event.preventDefault();
    const deleteFlashId = event.target.getAttribute("data-delete-flash-id");
  
    if (deleteFlashId) {
      const response = await fetch(`/api/flashcards/${deleteFlashId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace("/flash");
      } else {
        console.log(response.statusText);
        alert("error");
      }
    }
  }
  
  const deleteFlashBtns = document.querySelectorAll(".delete-flash");
  deleteFlashBtns.forEach((btn) => {
    btn.addEventListener("click", deleteFlash);
  });
  
  