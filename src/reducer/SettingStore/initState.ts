interface settingStoreInterface {
    isError: boolean;
    errorNum: number;
    errorName: string;
    isLoading: boolean;
    loadingName: string;
}

export const initialState : settingStoreInterface = {
    isError: false,
    errorNum: NaN,
    errorName: '',
    isLoading: false,
    loadingName: '',
};