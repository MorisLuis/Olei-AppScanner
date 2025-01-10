export interface ApiError {
    response?: {
        data: {
            error: string;
        };
        status: number;
        statusText: string;
    };
    message: string;
}
