
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(2002,{ cors: true })
export class ChatGateway {

  connectedUsers: Array<any> = []

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('register')
  handleRegister(@ConnectedSocket() socket: any, @MessageBody() data: number) {
    this.connectedUsers.push({ socketID: socket.id, userID: data })
    const connectedIds = this.connectedUsers.map((user) => { return { id: user.userID } })
    this.server.emit('receive_online', connectedIds)
  }


  @SubscribeMessage('Request_Call')
  handleCallRequest(@ConnectedSocket() socket: any, @MessageBody() data: any) {
    console.log('test', data)
    const destSocket = this.connectedUsers.findIndex((elmnt) => elmnt.userID == data)
    const caller = this.connectedUsers.findIndex((elmnt) => elmnt.socketID == socket.id)
    if (destSocket !== -1) socket.to(this.connectedUsers[destSocket].socketID).timeout(5000).emit('Call_Request', this.connectedUsers[caller].userID)
    else socket.emit('Call_Offline')
  }
  
  @SubscribeMessage('Accept_Call')
  handleCallAcceptCall(@ConnectedSocket() socket: any, @MessageBody() data: any) {
    const destSocket = this.connectedUsers.findIndex((elmnt) => elmnt.userID == data)
    if (destSocket !== -1) socket.to(this.connectedUsers[destSocket].socketID).timeout(5000).emit('Call_Accepted')
    else socket.emit('Call_Offline')
  }

  @SubscribeMessage('Reject_Call')
  handleRejectCall(@ConnectedSocket() socket: any, @MessageBody() data: any) {
    const destSocket = this.connectedUsers.findIndex((elmnt) => elmnt.userID == data)
    if (destSocket !== -1) socket.to(this.connectedUsers[destSocket].socketID).timeout(5000).emit('Call_Rejected')
    else socket.emit('Call_Offline')
  }

  @SubscribeMessage('send_message')
  handleMessage(@ConnectedSocket() socket: any, @MessageBody() data: any) {
    const destSocket = this.connectedUsers.findIndex((elmnt) => elmnt.userID == data.dest)
    if (destSocket !== -1) socket.to(this.connectedUsers[destSocket].socketID).timeout(5000).emit('receive_message', data.msg)
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() socket: any) {
    const pos = this.connectedUsers.map(e => e.socketID).indexOf(socket.id);
    this.connectedUsers.splice(pos, 1)
    // console.log("socket", socket)
    this.server.emit('receive_online', this.connectedUsers.map((user) => user.userID))
  }
}
