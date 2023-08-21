import { dataSource } from '../../utils/db.utils.js'
import messagesModel from './messages.model.js';

const msgRepository = dataSource.getRepository(messagesModel)

const getMessages = async (user, friend) => {
    try {
        const result = await msgRepository.find({
            where: [{ sender: user, receiver: friend }, { sender: friend, receiver: user }],
            order : {
                date : 'DESC'
            }
        })

        if (result && result.length !== 0) {
            return {
                statusCode: 200,
                payload: {
                    statusCode: 7001,
                    data: result
                }
            }

        }
        return {
            statusCode: 402,
            payload: {
                statusCode: 7004,
                data: "no data"
            }
        }
    } catch (error) {
        console.log(error);
        throw 'Error in "getMessages" service';
    }
};

const addMessage = async (message) => {
    try {
        const result = await msgRepository.save(message) ;
        if (result) {
            return {
                statusCode: 200,
                payload: {
                    statusCode: 7001,
                    data: result
                }
            }
        }

    } catch (error) {
        console.log(error);
        throw 'Error in "addMessage" service';
    }
};

export default {
    getMessages,
    addMessage
}