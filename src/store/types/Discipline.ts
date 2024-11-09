export interface Discipline {
	id: string;
	name: string;
	instructor: string;
	patent: string;
}

export interface DisciplineState {
	data: Discipline[];
	loading: boolean;
	error: string | null;
}
