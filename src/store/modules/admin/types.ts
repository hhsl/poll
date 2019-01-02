import { User } from '@/components/admin/types';

export interface AdminState {
    allUser: User[];
    error: boolean;
}
