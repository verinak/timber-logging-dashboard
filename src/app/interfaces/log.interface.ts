export type LogLevel = 'INFO' | 'WARN' | 'ERROR';
export type LogSortBy = 'count' | 'recent';

export interface ApplicationLog {
    count: number;
    createdAt: string;
    updatedAt: string;
    message: string;
    level: LogLevel;
}

export interface LogsQuery {
    search?: string;
    level?: LogLevel;
    sortBy?: LogSortBy;
    page?: number;
    limit?: number;
}
