let selectableContacts = $(".selectableContact");
let senderName = $("#senderName");
let senderImage = $("#senderImage");

selectableContacts.each(function(index)
{
    selectableContacts[index].addEventListener("click",(function(event)
    {
        $(".inboxBox")[0].removeAttribute("hidden");
        disableOtherContacts();
        selectableContacts[index].classList.add("active");
        senderName[0].innerText = selectableContacts[index].innerText;
        senderImage[0].setAttribute("src", selectableContacts[index].children[0].getAttribute("src"));

        //Make get request to database for messages
    }));
    
});

function disableOtherContacts()
{
    selectableContacts.each(function(index)
    {
        selectableContacts[index].classList.remove("active");
    });
}