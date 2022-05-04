export interface UpdateTaskModalProps {
	id: string;
	isOpen: boolean;
	onClose: () => void;
}

export interface UpdateTaskDto {
	id: string;
	priority?: string;
	description?: string;
	status?: string;
}
