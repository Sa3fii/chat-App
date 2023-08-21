import JWT from 'jsonwebtoken'
import usersModel from './users.model.js';
import { dataSource } from '../../utils/db.utils.js'

const userRepository = dataSource.getRepository(usersModel)

export const signIn = async (user, password) => {
  try {
    const result = await userRepository.findOneBy({
      name: user
    })

    if (result) {
      if (result.password === password) {
        let accessToken = JWT.sign({ user, id : result.id  }, process.env.ACT_KEY, { expiresIn: '2h' });
        return {
          statusCode: 200,
          payload: {
            statusCode: 7000,
            data: accessToken
          }
        };
      }
      return {
        statusCode: 402,
        payload: {
          statusCode: 7003,
          data: "Invalid password"
        }
      };
    }

    return {
      statusCode: 401,
      payload: {
        statusCode: 7001,
        data: 'User Not found'
      }
    };

  } catch (error) {
    if (error.response && [401, 400].includes(error.response.status)) {
      console.error('⚠️  SignIn:', error.response.status === 401 ? 'Unauthorized' : 'Error', 'From RBAC');
      return {
        statusCode: error.response.status,
        payload: error.response.data
      }
    }
    console.log(error);
    throw 'Error in "signIn" service';
  }
};

export const getUsers = async () => {
  try {
    const result = await userRepository.find()

    if (result) {
        return {
          statusCode: 200,
          payload: {
            statusCode: 7000,
            data: result
          }
        };
      
    }

    return {
      statusCode: 401,
      payload: {
        statusCode: 7001,
        data: 'No data found'
      }
    };

  } catch (error) {
    console.log(error);
    throw 'Error in "getUsers" service';
  }
};


export const getUserByAttribute = async (attribute, value) => {
  try {
    const query = `SELECT * FROM users WHERE ${attribute}=?`;
    const user = await DBI.pFetchOne(query, [value]);

    if (user) return {
      statusCode: 200,
      payload: user
    }

    return {
      statusCode: 204,
      payload: {
        code: 6004,
        message: 'User not found'
      }
    }
  } catch (error) {
    console.log(error);
    throw 'Error in "getUserByAttribute" service';
  }
};


export const getAuthenticatedUser = async (userFromRBAC) => {
  try {
    const query = `SELECT CONCAT(users.first_name, ' ', users.last_name) AS name, c.label AS wFor, 
      (SELECT roles.role FROM roles WHERE roles.rbid=?) AS role 
      FROM users
        LEFT JOIN customers c ON c.id = users.customer_id
    WHERE users.rkey=?`;
    const mcaUser = await DBI.pFetchOne(query, [userFromRBAC.rid, userFromRBAC.id]);
    if (!mcaUser) throw 'User from RBAC not found in core';

    const { wForID, rid, ...refinedUser } = ({ ...userFromRBAC, ...mcaUser });

    return {
      statusCode: 200,
      payload: refinedUser
    }
  } catch (error) {
    console.log(error);
    throw 'Error in "getAuthenticatedUser" service';
  }
};




export default {
  signIn,
  getUserByAttribute,
  getAuthenticatedUser,
  getUsers
};