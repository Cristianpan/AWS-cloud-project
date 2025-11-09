export default class ResourceNotFound extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "ResourceNotFound";
        this.statusCode = 404;
    }
}