async function getCurrentUser(){
    const res = await fetch("http://localhost:5000/users/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })    

    return await res.json();        
}

async function findUserById(id) {    
    const res = await fetch("http://localhost:5000/users/getById/" + id);
    return await res.json();
}


export { getCurrentUser, findUserById };
