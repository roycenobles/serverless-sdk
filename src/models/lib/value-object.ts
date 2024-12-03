import { schemaValidator } from '../../validation/lib/schema-validator';

export interface ValueObjectProps {
	[index: string]: unknown;
}

export abstract class ValueObject<T extends ValueObjectProps> {
	protected props: T;

	constructor(props: T) {
		this.props = Object.freeze(props);
	}

	protected validate(schema: Record<string, unknown>): void {
		schemaValidator(schema, this.props);
	}
}
