interface InsertPoll {
    affected_rows: number;
}

export interface InsertPollQuery {
    insert_Poll: InsertPoll;
}

export interface Poll {
    title: string;
    created_at: Date;
    id: string;
}

export interface GetPollQuery {
    Poll: Poll[];
}
