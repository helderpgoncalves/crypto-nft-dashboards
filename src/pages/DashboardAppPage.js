import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              {faker.finance.amount(0, 9999, 0)}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Total Sales
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              {faker.finance.amount(0, 9999, 0)}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Total Orders
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
