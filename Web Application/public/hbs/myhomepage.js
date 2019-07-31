let selectableContacts = $(".selectableContact");
let senderName = $("#senderName");
let senderImage = $("#senderImage");
let socket = io();

let messagesBox = $(".messagesBox");
let inputMessage = $("#inputMessage");
let sendButton = $("#sendButton");

let currentContact = null;
let username = $("#username")[0].innerText.split(" ")[1];
let mobile = $("#mobile")[0].innerText;

let userId = null;
let currentContactId = null;
let userSendMessages = null;
let userRecievedMessages = null;
let messages = [];

jQuery.post("/profile/myid", {mobile}, function(user)
{
    userId = user.id;    
});

selectableContacts.each(function(index)
{
    selectableContacts[index].addEventListener("click",(function(event)
    {
        $(".inboxBox")[0].removeAttribute("hidden");
        disableOtherContacts();
        selectableContacts[index].classList.add("active");        
        senderName[0].innerText = selectableContacts[index].innerText;
        senderImage[0].setAttribute("src", selectableContacts[index].children[0].getAttribute("src"));

        currentContact = event.target.children[1].innerText;
        messagesBox.empty();

        jQuery.post("/profile/checkOnline", {   currentContact},function(status)
        {
            if(status == "Online")
                $("#status")[0].removeAttribute("hidden");
        });
        
        async function getMessages()
        {
            //Request to get sent messages
            await jQuery.post("/profile/messages", {
                username,
                currentContact 
            },
            function(sentMessages)
            {
                userSendMessages = sentMessages;
            });

            //Request to get Recieved Messages
            await jQuery.post("/profile/messages", {
                username: selectableContacts[index].innerText.substr(1),
                currentContact: mobile 
            },
            function(recieveMessages)
            {
                userRecievedMessages = recieveMessages;
            });

            messages = userSendMessages.concat(userRecievedMessages);
            messages.sort(function(first, second)
            {
                if(first.id > second.id)
                    return 1;
                if(first.id < second.id)
                    return -1;
                return 0;
            });
            messages.forEach(function(message)
            {
                if (message.userId == userId)
                {
                    messagesBox.append(`<div class="message myMessage bg-success text-light">${message.message} <span class="time text-danger">${message.time}</span></div><br><br>`)
                }
                else if(message.userId != userId) 
                {
                    messagesBox.append(`<div class="message notMyMessage bg-secondary text-light">${message.message} <span class="time text-danger">${message.time}</span></div><br><br>`)
                }
            })
        }
        getMessages();
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
        mobile: currentContact,
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
