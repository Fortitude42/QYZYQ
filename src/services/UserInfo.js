async function isLogged(){
    const res = await fetch("http://localhost:5000/users/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })

    const data = await res.json();

    return data.isLoggedIn;
}

export {isLogged};