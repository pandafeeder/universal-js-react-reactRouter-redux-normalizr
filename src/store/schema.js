import { schema } from 'normalizr';

export const charSchema = new schema.Entity('chars')
export const charListSchema = [charSchema]

