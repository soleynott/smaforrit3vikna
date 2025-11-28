export interface TasksThumbnail {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
    onToggle: () => void; //callback from parent
}