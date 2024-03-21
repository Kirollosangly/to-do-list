export interface Task extends Iterable<any> {
    id: string,
    task_title: string,
    task_description: string,
    task_deadline: string,
    compeleted: boolean,
    archived: boolean
}