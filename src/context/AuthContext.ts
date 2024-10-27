import {createContext} from 'react';

type User = {
        _id: string,
        userName: string,
        firstName: string,
        lastName: string,
        role: string
}

interface AuthContextType {
    user: User | undefined | null;
    login: (data: User) => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType|undefined>(undefined);