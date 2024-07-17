import jwtDecode from 'jwt-decode';

export function validateJwt(token) {
    if (!token || token.split('.').length !== 3) {
        console.error('Invalid JWT token format');
        return false;
    }
    
    try {
        const decoded = jwtDecode(token);
        console.log('Decoded JWT payload:', decoded);
        
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            console.error('JWT token has expired');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return false;
    }
}



// // export const parseJwt = (token) => {
// //     try {
// //       return JSON.parse(atob(token.split(".")[1]));
// //     } catch (e) {
// //       return null;
// //     }
// //   };
  
// //   export const validateToken = (token) => {
// //     if (!token) {
// //       return false; 
// //     }
  
// //     const decodedToken = parseJwt(token);
  
// //     if (!decodedToken) {
// //       return false; // Token could not be decoded
// //     }
  
// //     // Check if token is expired
// //     return decodedToken.exp * 1000 > Date.now() && decodedToken.exp * 1000 <= Date.now() + process.env.JWT_EXPIRATION_TIME;
// //   };

// // This validation will be moved to AuthHeader.js file leave it for the moment

// import jwtDecode from 'jwt-decode';

// export function validateJwt(token) {
//     if (!token || token.split('.').length !== 3) {
//         console.error('Invalid JWT token format');
//         return false;
//     }
    
//     try {
//         const decoded = jwtDecode(token);
//         console.log('Decoded JWT payload:', decoded);
        
//         if (decoded.exp && Date.now() >= decoded.exp * 1000) {
//             console.error('JWT token has expired');
//             return false;
//         }
        
//         return true;
//     } catch (error) {
//         console.error('Failed to decode JWT:', error);
//         return false;
//     }
// }