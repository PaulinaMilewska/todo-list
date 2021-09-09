export class CreateTaskDTO {
    readonly title: string;
    readonly description: string;
    readonly isDone: boolean;
    readonly priority: number;
    readonly startDate: string;
    readonly endDate: string;
}