export interface Question {
    created_at: string;
    Description: string;
    Customer_id: string;
    Admin_id: string;
    answers: Answer[];
    Title: string;
    _id: string;
    Topic: string[];
    vote: number;
    updated_at: string;
    uid: string;
}

export interface Answer {
    _id: string;
    created_at: string;
    answer: string;
    expert_id: string;
    vote: number;
    updated_at: string;
    uid: string;
}

