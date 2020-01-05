import { Schema, model, Document, Model, Types } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  articles: [object];
}

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: Types.ObjectId, ref: 'Article' }],
});

export const User: Model<UserDocument> = model('User', schema);

export default User;
