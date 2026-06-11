export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    meta: Array<{
        total_count: number;
    }>;
}
