import { Discipline } from './Discipline';

export interface ResponseLogin {
	success: boolean;
	message: string;
	data?: {
		id: string;
		username: string;
		token: string;
	};
}

export interface ResponseTime {
	success: boolean;
	message: string;
	data?: {
		id: string;
		number: number;
		startTime: string;
		endTime: string;
	}[];
}

export interface ResponseDiscipline {
	success: boolean;
	message: string;
	data?: Discipline[];
}
