document.querySelector("#logout-btn").addEventListener("click",e=>{
    e.preventDefault();
    fetch("/api/adopters/logout",{
        method:"DELETE"
    }).then(res=>{
        if(res.ok){
           location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})