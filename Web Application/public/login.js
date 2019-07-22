
let loginButton = $("login");
let loginForm = $("loginForm");

let signupButton = $("signup");
let signupForm = $("signupForm");

loginButton.click(function(event)
{
    event.preventDefault();
    let loginUsername = $("#loginUsername");
    let loginPassword = $("#loginPassword");

    if (!loginUsername)
    {
        console.log("Enter Username");
        return;
    }
    else if(!loginPassword)
    {
        console.log("Enter Password");
        return;
    }
    else 
        loginForm.submit();

});

signupForm.click(function(event)
{
    event.preventDefault();

    let username = $("#username");
    let password = $("#password");
    let retypePassword = $("#retypePassword");
    let mobile = $("#mobile");
    
    if(!username)
    {
        console.log("Enter Username");
        return;
    }
    else if (!password)
    {
        console.log("Enter Password");
        return;
    }
    else if (password != retypePassword)
    {
        console.log("Passwords do not match");
        return;
    }   
    else if (!mobile)
    {
        console.log("Enter Mobile Number");
        return;
    }
    else 
    {
        signupForm.submit();
    }

});
