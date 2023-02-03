const addFlash= async (event) => {
    event.preventDefault();
  
    const newFlashSubject = document.querySelector(".new-flash-subject").value.trim();
    const newFlashName = document.querySelector(".new-flash-title").value.trim();
    const newFlashText = document.querySelector(".new-flash-text").value.trim();

    if (newFlashName && newFlashText && newFlashSubject) {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: newFlashSubject,
          term: newFlashName,
          definition: newFlashText,
        }),
      });
  
      console.log("RES:", response);
  
      if (response.ok) {
        document.location.replace("/flash");
      } else {
        console.log(response.statusText);
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector("#flash-btn").addEventListener("click", addFlash);
  
  