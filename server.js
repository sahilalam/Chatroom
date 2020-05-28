const exp=require("express");
const app=exp();
const http=require('http');
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);
let users={
    'sahil':"7011",
    'jojo':"7011",
    'arman':"7011"
}
let socketmap={

};
app.use('/',exp.static(__dirname+"/public"));
io.on('connection',(socket)=>{
    socket.on('login',(data)=>{
        if(users[data.username]==data.password)
        {
            socket.join(data.username);
            socketmap[socket.id]=data.username;
            socket.emit('loggedin',{id:socket.id});
        }
        else
        {
            socket.emit('invalid');
        }

    })
    socket.on('send',(data)=>{
        let mssg={
            message:data.mssg,
            sender:socketmap[socket.id]
        };
        if(data.to)
        {
            socket.to(data.to).emit('sent',mssg);
        }
        else{
            socket.broadcast.emit('sent',mssg)
        }
        
    })

})

server.listen(1234,()=>
{
    console.log("server started at http://localhost:1234");
})