import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import GroceryApp from '../components/GroceryApp';

export default function Home() {
  return (
    <Container sx={{ pt: 3 }}>
      <Grid container justifyContent="center">
        <Grid item minWidth={'320px'} sx={{ width: { lg: '900px', md: '800px', sm: '700px', xs: '375px' } }}>
          <GroceryApp />
        </Grid>
      </Grid>
    </Container>
  );
}
