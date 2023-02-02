const addPost = async (event) => {
    event.preventDefault();
  
    console.log("adding post");
  
    const newPostName = document.querySelector(".new-post-title").value.trim();
    const newPostText = document.querySelector(".new-post-text").value.trim();
  
    console.log(newPostName, newPostText);
  
    if (newPostName && newPostText) {
      console.log("form filled out, starting fetch");
      const response = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newPostName,
          text: newPostText,
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
  };
  
  document.querySelector("#post-btn").addEventListener("click", addPost);
  
  