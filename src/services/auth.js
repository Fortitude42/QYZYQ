import axios from "axios";

const API_URL = "http://localhost:5000/users";

function registerUser(detail) {
    alert(detail);
    return axios.post(API_URL + "/register", {
        firstname: detail.first_name,
        lastname: detail.last_name,
        email: detail.email,
        password: detail.password
    });
};

async function loginUser(detail){
    const user = {
        email: detail.email,
        password: detail.password,
    }

    try {
        const res = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        localStorage.setItem("token", data.token)
        console.log(data.token);
        console.log("Succesfullt saved");
    } catch(err) {
        console.log("Error: " + err);
    }
}

function logoutUser(){
    localStorage.removeItem("token");
}

export {loginUser,logoutUser,registerUser}