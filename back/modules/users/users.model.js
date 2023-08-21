import {EntitySchema} from 'typeorm'

export default new EntitySchema ({
    name : 'user',
    columns :{
        id:{
            primary : true,
            type : 'int',
            generated : true
        },
        name :{
            type : 'varchar'
        },
        password : {
            type : 'varchar' 
        }
        
    }
})