import { AppBar, Box, Card, CardContent, Container, CssBaseline, Grid, Toolbar, Typography } from "@suid/material";
import CampingItemList from "./CampingItemList";
import { campingItemList } from './store/store';
import CampingListCounter from "./CampingListCounter";

export default function App() {



  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Camping List
          </Typography>
        </Toolbar>
      </AppBar>


      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CampingItemList />
              wut
            </Grid>
            <Grid item xs={12}>
              <CampingListCounter/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}


