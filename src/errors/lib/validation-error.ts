type ValidationErrorItem = {
	instancePath: string;
	schemaPath: string;
	keyword: string;
	params: Record<string, unknown>;
	message: string;
};

export class ValidationError extends Error {
	public readonly statusCode: number;

	constructor(message: string) {
		super(message);
		this.name = 'Validation Error';
		this.statusCode = 400;
	}

	public static isInstance(value: unknown): asserts value is ValidationError {
		if (!(value instanceof ValidationError)) {
			throw new Error('Not a validation error');
		}
	}

	public get items(): ValidationErrorItem[] {
		return JSON.parse(this.message);
	}
}
