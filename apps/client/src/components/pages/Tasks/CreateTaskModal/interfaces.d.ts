export interface CreateTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface CreateTaskDto {
	priority: string;
	description: string;
}
