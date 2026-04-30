import { atom } from 'nanostores';
import { type User } from '../types/user';

export const user = atom<User>({
    username: undefined
})