import { User } from '@/components/admin/types';

export type AffectedRows = number;
export type UserId = string;
export type UserName = string;

interface InsertedUser {
    id: UserId;
    name: UserName;
}

interface InsertUser {
    affected_rows: AffectedRows;
    returning: InsertedUser[];
}

export interface InsertUserQuery {
    insert_User: InsertUser;
}

export interface GetUserQuery {
    User: User[];
}
