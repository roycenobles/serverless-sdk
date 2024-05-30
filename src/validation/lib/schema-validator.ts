import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import { ValidationError } from '../../errors/lib/validation-error';

export function schemaValidator(schema: Record<string, unknown>, body: unknown) {
	const ajv = new Ajv({ allErrors: true });

	addFormats(ajv);

	if (!ajv.validate(schema, body)) {
		const msg = JSON.stringify(ajv.errors);
		throw new ValidationError(msg);
	}

	return null;
}
