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

export interface HasuraPollVote {
    PollVote: Array<{
        VoteForOption: {
            id: UUID;
            text: string;
        };
        created_at: string;
    }>;
}

export interface HasuraPoll {
    title: string;
    created_at: string;
    id: UUID;
    polloptionssBypollId: HasuraPollOption[];
}

export interface HasuraPollOption {
    text: string;
    id: UUID;
    pollvotesBycreatedFor_aggregate: {
        aggregate: {
            count: number;
        }
    };
}

export interface HasuraPollOptions {
    PollOptions: HasuraPollOption[];
}

export interface HasuraQuery<T> {
    [index: string]: T[];
}

export interface HasuraSubscription<T> {
    subscriptionData: {
        data: T;
    };
    variables: any;
}
