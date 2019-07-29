let selectableContacts = $(".selectableContact");
let senderName = $("#senderName");
let senderImage = $("#senderImage");
let socket = io();

let messagesBox = $(".messagesBox");
let inputMessage = $("#inputMessage");
let sendButton = $("#sendButton");

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

sendButton.click(function(event)
{
    socket.emit("send", {
        message: inputMessage.val()
    });
    jQuery.get("/time", function(time)
    {
        messagesBox.append(`<div class="message myMessage bg-success text-light">${inputMessage.val()} <span class="time text-danger">${time}</span></div><br><br>`)
        inputMessage.val("");
    })
    
})
socket.on("recieve", function(data)
{
    messagesBox.append(`<div class="message notMyMessage bg-secondary text-light">${data.message} <span class="time text-danger">${data.time}</span></div><br><br>`)
});
