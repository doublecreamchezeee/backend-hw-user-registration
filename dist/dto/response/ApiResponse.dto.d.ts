export declare class ApiResponse<T> {
    readonly statusCode: number;
    readonly message: string;
    readonly data: T | null;
    constructor(statusCode: number, message: string, data: T | null);
    static builder<T>(): ApiResponseBuilder<T>;
}
declare class ApiResponseBuilder<T> {
    private statusCode;
    private message;
    private data;
    withStatusCode(statusCode: number): ApiResponseBuilder<T>;
    withMessage(message: string): ApiResponseBuilder<T>;
    withData(data: T): ApiResponseBuilder<T>;
    build(): ApiResponse<T>;
}
export {};
