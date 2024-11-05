export class ApiResponse<T> {
    public constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly data: T | null,
    ) {}

    static builder<T>() {
        return new ApiResponseBuilder<T>();
    }
}

class ApiResponseBuilder<T> {
    private statusCode: number = 200;
    private message: string = '';
    private data: T | null = null;

    withStatusCode(statusCode: number): ApiResponseBuilder<T> {
        this.statusCode = statusCode;
        return this;
    }

    withMessage(message: string): ApiResponseBuilder<T> {
        this.message = message;
        return this;
    }

    withData(data: T): ApiResponseBuilder<T> {
        this.data = data;
        return this;
    }

    build(): ApiResponse<T> {
        return new ApiResponse<T>(this.statusCode, this.message, this.data);
    }
}