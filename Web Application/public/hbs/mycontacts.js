let editButtons = $(".editButton");
let deleteButtons = $(".deleteButton");

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

deleteButtons.each(function(index)
{
    deleteButtons[index].addEventListener("click", function(event)
    {
        let parentContainer = event.target.parentNode.parentNode.parentNode.parentNode;
        let rows = parentContainer.children[1].children[0].children;
        let containerToDelete = parentContainer.parentNode;

        jQuery.ajax({
            type: "DELETE",
            url: "/profile/deleteContact",
            data: {
                phone: rows[1].children[1].innerText
            }                        
        });
        
        containerToDelete.remove();
    });
});