import Ajv, { JSONSchemaType } from 'ajv';

export const JsonValidator: Ajv = new Ajv();

export type JsonSchema<T> = JSONSchemaType<T>;
