import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import Form from './Form';
import CustomAlert from './CustomAlert';
import AnimatedList from './AnimatedList';
import groceryApi from '../pages/api/api';
import { IModel } from '../types/types';

const GroceryApp = () => {
  const theme = useTheme();

  const { data, isError, isLoading, isFetching } = useQuery<IModel[]>({
    queryKey: ['todos'],
    queryFn: groceryApi.getAllItems,
  });

  const isListEmpty = !data?.length && !isLoading && !isError;

  return (
    <Box component="section" borderRadius={1} sx={{ boxShadow: 5, p: { lg: 5, md: 5, sm: 5, xs: 1 } }}>
      <Typography textAlign="center" variant="h3" mb={5} color={theme.palette.primary.main}>
        Grocery List
      </Typography>

      <Form inputLabel="What should I buy?" />

      <List
        component="article"
        sx={{
          p: 0,
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <CustomAlert trigger={isError} type="error" text="Server error occured" />
        <CustomAlert trigger={isListEmpty} type="success" text="Start adding your items now!" />
        <CustomAlert trigger={isLoading && isFetching} type="info" text="Loading..." />
        <AnimatedList data={data} />
      </List>
    </Box>
  );
};

export default GroceryApp;
