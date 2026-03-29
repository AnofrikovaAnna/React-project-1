interface errorStoreInterface {
    isError: boolean;
    errorNum: number;
    errorName: string;
}

export const initialState : errorStoreInterface = {
    isError: false,
    errorNum: NaN,
    errorName: '',
};