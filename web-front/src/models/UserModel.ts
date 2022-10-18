import { JsonSchema, JsonValidator } from '../utils/JsonValidation';

export type UserModel = {
	id: string;
	username: string;
};

const schema: JsonSchema<UserModel> = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		username: { type: 'string' },
	},
	required: ['id', 'username'],
	additionalProperties: false,
};

export const validate = JsonValidator.compile(schema);
