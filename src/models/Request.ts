// Generated by https://quicktype.io

export interface Request {
    _id: string;
    created_at: string;
    updated_at: string;
    topic: string[];
    Title: string;
    content: string;
    response: Response[];
    customer_id: string;
    uid: string;
}

export interface Response {
    _id: string;
    created_at: string;
    content: string;
    expert_id: string;
    updated_at: string;
    uid: string;
}