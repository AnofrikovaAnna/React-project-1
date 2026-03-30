import { competitionStoreInterface } from "../CompetitionStore/initState";

interface allCompetitionStoreInterface {
    competitions: competitionStoreInterface[];
}

export const initialState : allCompetitionStoreInterface = {
    competitions: []
};