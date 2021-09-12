export class CreateTaskDTO {
    readonly taskId: string | null;
    readonly title: string;
    readonly description: string;
    readonly isDone: boolean;
    readonly priority: string;
    readonly startDate: string;
    readonly endDate: string;
}