import { competitionStoreInterface } from "../CompetitionStore/initState";

interface userCompetitionStoreInterface {
    competitions: competitionStoreInterface[];
}

export const initialState : userCompetitionStoreInterface = {
    competitions: []
};