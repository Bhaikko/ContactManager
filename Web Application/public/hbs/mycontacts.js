let editButtons = $(".editButton");
let deleteButtons = $(".deleteButton");

// console.log(editButtons);
editButtons.each(function(index)
{
    editButtons[index].addEventListener("click", function(event)
    {
        let bMakeRequest = false;
        let parentContainer = event.target.parentNode.parentNode.parentNode.parentNode;
        let rows = parentContainer.children[1].children[0].children;
        let values = [];
        
        for(let i = 0 ; i < 4 ; i++)
            values[i] = rows[i].children[1];

        values.forEach(function(value, index)
        {
            if(index != 1)
            {
                if(value.getAttribute("contenteditable") == "false")
                {
                    value.setAttribute("contenteditable", "true");
                    event.target.innerText = "Done";
                }
                else 
                {
                    value.setAttribute("contenteditable", "false");
                    bMakeRequest = true;
                    event.target.innerText = "Edit";
                    
                }
            }
        });
        if(bMakeRequest)
        {
            jQuery.ajax({
                type: "PATCH",
                url: "/profile/patchContact",
                data: {
                    name: values[0].innerText,
                    phone: values[1].innerText,
                    address: values[2].innerText,
                    email: values[3].innerText
                }                        
            });
            bMakeRequest = false;
        }

    });
});