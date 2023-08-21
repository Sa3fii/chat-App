import {EntitySchema} from 'typeorm'

export default new EntitySchema ({
    name : 'message',
    columns :{
        id:{
            primary : true,
            type : 'int',
            generated : true
        },
        sender :{
            type : 'varchar'
            
        },
        receiver : {
            type : 'varchar' 
        },
        content :   {
            type : 'varchar' 
        },
        date : {
            type : 'timestamp'
        }
        
    }
})