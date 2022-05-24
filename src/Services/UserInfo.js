async function getCurrentUser(){
    const res = await fetch("http://localhost:5000/users/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })    

    const data = await res.json();   
    console.log(data);
    return data;
}

async function findUserById(id) {    
    const res = await fetch("http://localhost:5000/users/getById/" + id);
    const data = await res.json() ;    
    return data;
}


export { getCurrentUser, findUserById };
