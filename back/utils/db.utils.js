import typeorm from 'typeorm';
import usersModel from '../modules/users/users.model.js';
import messagesModel from '../modules/messages/messages.model.js';

export const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: '3306',
    username: "root",
    password: "pass",
    database: "chatApp",
    synchronize: true,
    entities: [usersModel,messagesModel],
})


dataSource.initialize().catch((error)=>{
    console.log("typeorm init error : ",error )
})