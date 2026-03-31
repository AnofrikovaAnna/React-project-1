import { slice } from './reducer';

export const { 
    setIsAuth, 
    setName,
    setSurname, 
    setLogin, 
    setAge, 
    setCountry, 
    setCity, 
    setStudyPlace,
    setUser,
    setId,
    setProtectedData,
} = slice.actions;

export default slice.reducer;