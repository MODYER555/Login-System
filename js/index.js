/*-------------------Sign-Up-JS-------------------*/

let uName = document.getElementById("name");
let uEmail = document.getElementById("email");
let uPass = document.getElementById("pass");
let signUpButton = document.getElementById("signUpButton");
let inputsInvalid = document.getElementById("inputsInvalid");
let inputsValid = document.getElementById("inputsValid");

let dataEntry=[];

if (window.location.pathname.includes("sign-up.html") || window.location.pathname === "/") {
    if (localStorage.getItem("userData")) {
    dataEntry = JSON.parse(localStorage.getItem("userData"));
}

signUpButton.addEventListener("click", function(){
    if(signUpvalidate()){
        let userData={
            name: uName.value,
            email: uEmail.value,
            password: uPass.value
        }

        if (isUserExist()) {
            let inputEmailInvalid = document.getElementById("inputEmailInvalid");
            inputsInvalid.classList.add("d-none");
            inputsValid.classList.add("d-none");
            inputEmailInvalid.classList.remove("d-none");
            return;
    }
        
        dataEntry.push(userData);
        
        inputsValid.classList.remove("d-none");
        inputsInvalid.classList.add("d-none");
        inputEmailInvalid.classList.add("d-none");

        localStorage.setItem("userData", JSON.stringify(dataEntry));
    }
    else{
        inputsValid.classList.add("d-none");
        inputsInvalid.classList.remove("d-none");
    }

}
)




//Name Validation

function validateName() {
    let name = uName.value;
    let regex = /^[A-Za-z]+$/;
    let inputsInvalid = document.getElementById("inputsInvalid");
    let alertName = document.getElementById("alertName");

    if (regex.test(name)) {
        alertName.classList.add("d-none");

        return true;
    } else {
        alertName.classList.remove("d-none");
        return false;
    }
}

//Email Validation

function validateEmail(){
    let email = uEmail.value;
    let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let alertEmail = document.getElementById("alertEmail");

    if(regex.test(email)){
        alertEmail.classList.add("d-none");
        return true;
    } else {
        alertEmail.classList.remove("d-none")
        return false;
    }
}


//password Validation

function validatePass(){
    let pass = uPass.value;
    let regex = /^[A-Za-z0-9!@#$%^&*]{6,20}$/;
    let alertPass = document.getElementById("alertPass");

    if(regex.test(pass)){
        alertPass.classList.add("d-none");
        return true;
    } else {
        alertPass.classList.remove("d-none")
        return false;
    }
}


//all inputs validation
function signUpvalidate(){
    if(validateName() && validateEmail() && validatePass()){
        return true;
    }
}

//check if email is already exists
function isUserExist() {
    for (var i = 0; i < dataEntry.length; i++) {
        if (uEmail.value === dataEntry[i].email) {
        return true;
        }
    }
    return false;
}


}

/*-------------------Login-JS-------------------*/

let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");
let loginButton = document.getElementById("loginButton");




if (window.location.pathname.includes("index.html")){
    loginButton.addEventListener("click", function(){
    dataEntry = JSON.parse(localStorage.getItem("userData"))|| [];
    for(var i=0; i<dataEntry.length ;i++){
        if(loginEmail.value == dataEntry[i].email){
            if(loginPass.value == dataEntry[i].password){
                localStorage.setItem("currentUser", dataEntry[i].name);
                window.location.href = "home.html";
                return;
            }else{
                window.alert("password is incorect")
                return; 
            }
        }
    }
    window.alert("Email not found");
})
}


/*-------------------Home-JS-------------------*/
if(window.location.pathname.endsWith("home.html")){
    let userName = localStorage.getItem("currentUser");
        document.getElementById("loginName").innerHTML = `Welcome ${userName}`;
}