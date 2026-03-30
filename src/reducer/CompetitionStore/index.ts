import { slice } from './reducer';

export const { 
    setId, 
    setNumOfTasks, 
    setDuration, 
    setName,
    setDate, 
    setIsEnded,
    setCompetition,
    setUserId,
    clearCompetition,
} = slice.actions;

export default slice.reducer;