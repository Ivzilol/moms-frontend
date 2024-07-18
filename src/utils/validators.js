import { jwtDecode } from 'jwt-decode';

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
        
        return decoded; 
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return false;
    }
}
