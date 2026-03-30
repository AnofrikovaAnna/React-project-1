import { slice } from './reducer';

export const { 
    addCompetition,
    deleteCompetition,
    clearCompetition,
} = slice.actions;

export default slice.reducer;