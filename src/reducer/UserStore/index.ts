import { slice } from './reducer';

export const { 
    setIsAuth, 
    setName,
    setSurame, 
    setLogin, 
    setAge, 
    setCountry, 
    setCity, 
    setStudyPlace,
} = slice.actions;

export default slice.reducer;