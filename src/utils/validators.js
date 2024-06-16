// export const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch (e) {
//       return null;
//     }
//   };
  
//   export const validateToken = (token) => {
//     if (!token) {
//       return false; 
//     }
  
//     const decodedToken = parseJwt(token);
  
//     if (!decodedToken) {
//       return false; // Token could not be decoded
//     }
  
//     // Check if token is expired
//     return decodedToken.exp * 1000 > Date.now() && decodedToken.exp * 1000 <= Date.now() + process.env.JWT_EXPIRATION_TIME;
//   };

// This validation will be moved to AuthHeader.js file leave it for the moment

import { useJwt } from 'react-jwt';

export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const validateToken = (token) => {
    if (!token) {
        return false;
    }

    const { decodedToken, isExpired } = useJwt(token);

    if (!decodedToken || isExpired) {
        return false; // Token could not be decoded or is expired
    }

    return true;
};