const returnBtns = document.querySelectorAll(".return-btn");
for (const returnBtn of returnBtns) {
    returnBtn.addEventListener("click",e=>{
        e.preventDefault();
        const pigId = e.target.getAttribute('data-pigid');
        console.log('pigId: ',pigId)
        fetch(`/api/pigs/${pigId}/return`,{
            method:"PUT"
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
}

const adoptBtns = document.querySelectorAll(".adopt-btn");
for (const adoptBtn of adoptBtns) {
    adoptBtn.addEventListener("click",e=>{
        e.preventDefault();
        const pigId = e.target.getAttribute('data-pigid');
        console.log('pigId: ',pigId)
        fetch(`/api/pigs/${pigId}/adopt`,{
            method:"PUT"
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
}