export type UUID = string;

export interface PollOption {
    text: string;
    id: UUID;
    count: number;
}

export interface Poll {
    title: string;
    created_at: string;
    id: UUID;
    options: PollOption[];
}

export interface PollBackend {
    title: string;
    created_at: string;
    id: UUID;
    polloptionssBypollId: PollOptionBackend[];
}

export interface PollOptionBackend {
    text: string;
    id: UUID;
    pollvotesBycreatedFor_aggregate: {
        aggregate: {
            count: number;
        }
    };
}
