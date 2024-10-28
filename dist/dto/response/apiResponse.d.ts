export declare class ApiResponse<T> {
    readonly statusCode: number;
    readonly message: string;
    readonly data: T | null;
    readonly error: string | null;
    constructor(statusCode: number, message: string, data: T | null, error: string | null);
    static builder<T>(): ApiResponseBuilder<T>;
}
declare class ApiResponseBuilder<T> {
    private statusCode;
    private message;
    private data;
    private error;
    withStatusCode(statusCode: number): ApiResponseBuilder<T>;
    withMessage(message: string): ApiResponseBuilder<T>;
    withData(data: T): ApiResponseBuilder<T>;
    withError(error: string): ApiResponseBuilder<T>;
    build(): ApiResponse<T>;
}
export {};
