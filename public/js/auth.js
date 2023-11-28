const loginBtn = document.querySelector("#login-btn")
const signupBtn = document.querySelector("#signup-btn")
console.log('loginBtn: ',loginBtn)
console.log('signupBtn: ',signupBtn)

if(loginBtn){
    //login handle
    document.querySelector("#auth-form").addEventListener("submit",e=>{
        e.preventDefault();
        const loginObj = {
            email:document.querySelector("#email-input").value,
            password:document.querySelector("#password-input").value
        }
        fetch("/api/adopters/login",{
            method:"POST",
            body:JSON.stringify(loginObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.href = "/profile"
            } else {
                alert("trumpet sound")
            }
        })
    })
} else {
    //signup handle
    document.querySelector("#location-btn").addEventListener("click",e=>{
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(geoData=>{
            document.querySelector("#lattitude-input").value=geoData.coords.latitude;
            document.querySelector("#longitude-input").value=geoData.coords.longitude;
        })
    })
    document.querySelector("#auth-form").addEventListener("submit",e=>{
        e.preventDefault();
        const signupObj = {
            email:document.querySelector("#email-input").value,
            password:document.querySelector("#password-input").value,
            displayName:document.querySelector("#displayName-input").value,
            lat:document.querySelector("#lattitude-input").value,
            lng:document.querySelector("#longitude-input").value,     
        }
        fetch("/api/adopters",{
            method:"POST",
            body:JSON.stringify(signupObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.href = "/profile"
            } else {
                alert("trumpet sound")
            }
        })
    })
}