import * as mongoose from 'mongoose';
    
export const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isDone: Boolean,
  priority: Number,
  startDate: String,
  endDate: String,
});