export type CLog = {
    id?: string;
    title: string;
    desc: string;
    days: number;
    start: string;
    end: string;
    total: number;
};

export type CLogDay = {
    id?: string;
    cLogId: CLog['id'];
    date: string;
    count: number;
};
