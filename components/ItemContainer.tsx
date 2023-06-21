import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const ItemContainer = ({ borderColor, children }: { borderColor: string; children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 0, display: 'flex', width: '100%', mb: 2 }}>
      <Card
        variant="outlined"
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
          gap: { xs: 3 },
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: theme.transitions.create(['border'], {
            duration: theme.transitions.duration.standard,
          }),
          borderColor: borderColor,
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default ItemContainer;
