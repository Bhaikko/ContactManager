let deleteButtons = $(".deleteButtons");

deleteButtons.each(function(index)
{
    deleteButtons[index].addEventListener("click", function(event)
    {
        
        let deleteRow = event.target.parentNode.parentNode;
        let deleteRowValues = deleteRow.children;
        jQuery.ajax({
            type: "DELETE",
            url: "/admin/issues",
            data: {
                name: deleteRowValues[0].innerText,
                email: deleteRowValues[1].innerText,
            }                        
        });
        deleteRow.remove();
    })
})