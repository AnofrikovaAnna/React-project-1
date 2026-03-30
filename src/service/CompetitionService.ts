import { apiClient } from "../api/axios";

const makeCompetition = async (comp: {name: string, date: string, duration: number, numOfTasks: number, userId: number}) => {
    const params = {
        'name': comp.name,
        'date' : comp.date,
        'duration' : comp.duration,
        'numOfTasks': comp.numOfTasks,
        'userId' : comp.userId,
    };
    const res = await apiClient.post('/newcomp', params);
    return res.data;
    
};

const getCompetition = async (id: number) => {
    const res = await apiClient.get(`/getcomp${id}`);
    return res.data;
};

const getUserCompetition = async (id: number) => {
    const res = await apiClient.get(`/user/${id}/getcomp`);
    return res.data;
};

const getAllCompetition = async () => {
    const res = await apiClient.get('/getallcomp');
    return res.data;
};

const moveCompetition = async (id: number, date: string) => {
    console.log(id, date);
    const res = await apiClient.patch(`/comp/${id}/changedate`, { "date": date });
    return res.data;
};

export const competitionService = {
    makeCompetition,
    getCompetition,
    getUserCompetition,
    getAllCompetition,
    moveCompetition,
};