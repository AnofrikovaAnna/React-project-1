import React from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, List, ListItem } from '@mui/material' 
import { colors } from '../ui/Colors';

export const LayOutPage = () => {
    return (
        <Box>
            <Nav></Nav>
            <Typography
                    component="h1"
                    variant="h4"
                    sx={{ color: colors.primary.main,
                        margin: '20px',
                    }}
                    
                >
                Соревнования по программированию  
            </Typography>
            <Box sx={{
                    border: '2px solid' + colors.primary.main,
                    borderRadius: '20px',
                    margin: '80px 100px',
                }}>
                <Typography
                        component="h2"
                        variant="h5"
                        sx={{ color: colors.primary.main,
                            margin: '20px',
                        }}
                        
                    >
                    Предстоящие соревнования
                </Typography>
                <List sx={{
                        padding: '30px', 
                        gap: '20px',
                    }}>
                    <ListItem>
                        <Box sx={{display: 'flex',
                                gap: '30px',
                                border: '2px solid' + colors.primary.main,
                                borderRadius: '20px',
                                margin: '40px',}}>
                            <Typography>Логин:</Typography>
                            
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box sx={{display: 'flex',
                                gap: '30px',
                                border: '2px solid' + colors.primary.main,
                                borderRadius: '20px',
                                margin: '40px',}}>
                            <Typography>Логин:</Typography>
                            
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};