
let loginButton = $("#login");
let loginForm = $("#loginForm");

let signupButton = $("#signup");
let signupForm = $("#signupForm");

loginButton.click(function(event)
{
    event.preventDefault();
    let loginUsername = $("#loginUsername").val();
    let loginPassword = $("#loginPassword").val();

    if (loginUsername == "")
    {
        hideAllSmallElement();
        $("#usernameError").removeAttr("hidden");
        
        return;
    }
    else if(loginPassword == "")
    {
        hideAllSmallElement();
        $("#passwordError").removeAttr("hidden");
        return;
    }
    else 
    {
        jQuery.get("/getUser?username=" + loginUsername, function(user)
        {
            if(user.length == 1)
            {
                loginForm.submit();
            }
            else 
            {
                $("#loginError").removeAttr("hidden");
                return;
            }
                
        });        
    }
});

signupButton.click(function(event)
{
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();
    let retypePassword = $("#retypePassword").val();
    let mobile = $("#mobile").val();
    
    if(username == "")
    {
        hideAllSmallElement();
        $("#signupUsernameError").removeAttr("hidden");
        return;
    }
    else if (mobile == "")
    {
        hideAllSmallElement();
        $("#signupMobileError").removeAttr("hidden");
        return;
    }
    else if (password == "")
    {
        hideAllSmallElement();
        $("#signupPasswordError").removeAttr("hidden");
        return;
    }
    else if (password != retypePassword)
    {
        hideAllSmallElement();
        $("#signupRetypePassword").removeAttr("hidden");
        return;
    }    
    else 
    {
        jQuery.get("/getUser?username=" + username, function(user)
        {
            if(user.length == 1)
            {
                $("#signupUsernameExist").removeAttr("hidden");
                return;
            }
            else 
                signupForm.submit();
        });
        
    }

});

function hideAllSmallElement()
{
    smalls = $("small");
    smalls.each(function(index)
    {
        $(this)[0].setAttribute("hidden", "true");
    });
}
