import { Schema, model, Document, Model, Types } from 'mongoose';

export interface LinkDocument extends Document {
  from: string;
  to: string;
  code: string;
  data: Date;
  clicks: number;
  owner: Types.ObjectId;
}

const schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  data: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' },
});

export const Link: Model<LinkDocument> = model('Link', schema);
