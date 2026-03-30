import { slice } from './reducer';

export const { 
    setIsError, 
    setErrorName,
    setErrorNum,
    clearSetting,
    setLoading,
    clearLoading,
    setError,
} = slice.actions;

export default slice.reducer;