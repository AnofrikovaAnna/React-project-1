export interface competitionStoreInterface {
    id: number;
    name: string;
    date: string;
    numOfTasks: number;
    duration: number;
    isEnded: boolean;
    userId: number;
}

export const initialState : competitionStoreInterface = {
    id: -1,
    name: '',
    date: '00.00.0000 00:00',
    numOfTasks: 0,
    duration: 0,
    isEnded: false,
    userId: -1,
};