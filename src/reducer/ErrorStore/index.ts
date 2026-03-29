import { slice } from './reducer';

export const { 
    setIsError, 
    setErrorName,
    setErrorNum,
    clearError,
} = slice.actions;

export default slice.reducer;