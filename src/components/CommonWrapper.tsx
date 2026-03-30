import React from 'react';
import { settingSelector } from '../reducer/SettingStore/reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, 
         Dialog, 
         DialogActions, 
         DialogContent, 
         DialogContentText, 
         DialogTitle,
         CircularProgress } from '@mui/material';
import { clearSetting, clearLoading } from '../reducer/SettingStore';

interface CommonWrapperProps {
    children: React.ReactNode;
}

export const CommonWrapper : React.FC<CommonWrapperProps> = ({children}) => {
    const dispatch = useDispatch();
    const setting = useSelector(settingSelector);
    const onClose = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(clearSetting());
    };
    const onCloseLoading = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(clearLoading());
    };
    return (
        <>
            <Dialog 
                open={setting.isError}
                onClose={onClose}
                disableRestoreFocus 
            >
                <DialogTitle>Ошибка</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {setting.errorName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type='submit'
                            onClick={onClose}
                    >
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={setting.isLoading}
                onClose={onCloseLoading} 
                disableEscapeKeyDown
                disableRestoreFocus
            >
                <DialogContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                        <CircularProgress size={40} />
                        <span style={{ marginLeft: '16px' }}>
                            Выполняется операция...
                        </span>
                    </div>
                </DialogContent>
            </Dialog>

            {children}
        </>
    );

};

export default CommonWrapper;