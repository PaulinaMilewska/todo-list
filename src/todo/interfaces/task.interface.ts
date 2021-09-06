import { Document } from 'mongoose';
    
export interface Task extends Document {
    readonly title: string;
    readonly description: string;
    readonly isDone: boolean;
    readonly priority: number;
    readonly startDare: string;
    readonly endDate: string;
}