export interface Time {
	id: string;
	number: number;
	startTime: string;
	endTime: string;
}

export interface TimeState {
	times: Time[];
	loading: boolean;
}
