import React from 'react';
import { errorSelector } from '../reducer/ErrorStore/reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { clearError } from '../reducer/ErrorStore';

interface CommonWrapperProps {
    children: React.ReactNode;
}

export const CommonWrapper : React.FC<CommonWrapperProps> = ({children}) => {
    const dispatch = useDispatch();
    const error = useSelector(errorSelector);
    const onClose = () => {
        dispatch(clearError());
    };
    return (
        <>
            <Dialog 
                open={error.isError}
                onClose={onClose}
            >
                <DialogTitle>Ошибка</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {error.errorName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
            {children}
        </>
    );

};

export default CommonWrapper;