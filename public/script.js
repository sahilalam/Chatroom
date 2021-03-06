$(()=>{   
    socket=io(); 
    $("#chatroom").hide();
    $("#btn").click(()=>{
      socket.emit('login',{
          username:$("#username").val(),
          password:$("#password").val()
      })
    })
    socket.on('loggedin',(data)=>{
        $("#chatroom").show();
        $("#login").hide();
        console.log(`id:${data.id}`)
        $("#list").append($(`<li>id:${data.id}</li>`));
    });
    socket.on("invalid",()=>{
        window.alert("Invalid username or password");
    })
    $("#send").click(()=>{
        socket.emit('send',{
            to:$("#tousername").val(),
            mssg:$("#mssg").val()
        })
    })
    socket.on('sent',(data)=>{
        $("#list").append($(`<li>[${data.sender}]:${data.message}</li>`))

    })
})