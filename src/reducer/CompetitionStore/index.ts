import { slice } from './reducer';

export const { 
    setId, 
    setNumOfTasks, 
    setDuration, 
    setName,
    setDate, 
    setIsEnded,
} = slice.actions;

export default slice.reducer;