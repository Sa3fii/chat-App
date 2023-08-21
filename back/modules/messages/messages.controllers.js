import services from './messages.services.js'

const getMessages = async (request, response) => {
    try {
        const { user, friend } = request.query;
        const result = await services.getMessages(user, friend);
        return response.status(result.statusCode).send(result.payload);
    } catch (error) {
        console.error('⚠️ ', error);
        return response.status(400).send('An error has occured');
    }
}

const addMessage = async (request, response) => {
    try {
        const message = request.body;
        const result = await services.addMessage(message);
        return response.status(result.statusCode).send(result.payload);
    } catch (error) {
        console.error('⚠️ ', error);
        return response.status(400).send('An error has occured');
    }
}

export default {
    getMessages,
    addMessage
}