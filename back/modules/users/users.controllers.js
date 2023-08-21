import services from './users.services.js';

const signIn = async (request, response) => {
  try{
    const { name : user, password } = request.body;
    const token = await services.signIn(user,password);
    return response.status(token.statusCode).send(token.payload);
  }catch(e){
    console.error('⚠️ ', e);
    return response.status(400).send('An error has occured');
  }
};

const getUsers = async (request, response) => {
  try{
    const result = await services.getUsers();
    return response.status(result.statusCode).send(result.payload);
    
  }catch(e){
    console.error('⚠️ ', e);
    return response.status(400).send('An error has occured');
  }
};


const getAuthenticatedUser = async (request, response) => {
  try{
    const { authenticatedUser } = request.appLocals;
    const user = await services.getAuthenticatedUser(authenticatedUser);
    return response.status(user.statusCode).send(user.payload);
  }catch(e){
    console.error('⚠️ ', e);
    return response.status(400).send('An error has occured');
  }
};




export default {
  signIn,
  getAuthenticatedUser,
  getUsers
};