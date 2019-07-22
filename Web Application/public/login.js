
let loginButton = $("#login");
let loginForm = $("#loginForm");

let signupButton = $("#signup");
let signupForm = $("#signupForm");

loginButton.click(function(event)
{
    event.preventDefault();
    let loginUsername = $("#loginUsername").val();
    let loginPassword = $("#loginPassword").val();

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

signupButton.click(function(event)
{
    console.log("Inside");
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();
    let retypePassword = $("#retypePassword").val();
    let mobile = $("#mobile").val();
    
    if(username == "")
    {
        console.log("Enter Username");
        return;
    }
    else if (password == "")
    {
        console.log("Enter Password");
        return;
    }
    else if (mobile == "")
    {
        console.log("Enter Mobile Number");
        return;
    }
    else if (password != retypePassword)
    {
        console.log("Passwords do not match");
        return;
    }    
    else 
    {
        signupForm.submit();
    }

});
