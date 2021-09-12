import * as mongoose from 'mongoose';
    
export const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isDone: Boolean,
  priority: String,
  startDate: String,
  endDate: String,
});