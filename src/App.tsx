import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, createTheme, CssBaseline, Grid, Link, ThemeProvider, Toolbar, Typography } from "@suid/material";
import CampingItemList from "./components/CampingItemList";
import CampingListCounter from "./components/CampingListCounter";
import { createEventBus } from "@solid-primitives/event-bus";
import EventBusComponent from "./components/EventBusComponent";
import { createSignal } from "solid-js";
import { DarkMode, LightMode } from "@suid/icons-material";

export const eventBus = createEventBus<string>();

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b853a",
    },
    secondary: {
      main: "#7f7e00",
    },
    success: {
      main: "#008c5d",
    },
    error: {
      main: "#cf5e0f",
    },
  },
});

export default function App() {
  const [paletteMode, setPaletteMode] = createSignal<string>("light");
  const [value, setValue] = createSignal(0);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }} paddingBottom='56px'>
        <CssBaseline />
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Camping List
            </Typography>
            <CampingListCounter />
          </Toolbar>
        </AppBar>
        <Box paddingTop="56px"
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === paletteMode()
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
            
                <Typography variant="body1" gutterBottom>
                  This application is a proof of concept using <Link href="https://www.solidjs.com/" target="none">SolidJs</Link>, <Link href="https://suid.io/" target="none">SUID</Link>, and <Link href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" target="none">IndexedDb</Link> via <Link href="https://github.com/localForage/localForage" target="none">localForage</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CampingItemList />
              </Grid>
              <Grid item xs={12}>
                <EventBusComponent />
              </Grid>
            </Grid>
          </Container>
        </Box>

      </Box>
      <BottomNavigation
        sx={{ position: 'fixed', bottom: 0, width: 1.0 }}
        showLabels
        value={value()}
        onChange={(_event, newValue: number) => {
          setValue(newValue);
          setPaletteMode(newValue === 0 ? "light" : "dark");
        }}>
        <BottomNavigationAction icon={<LightMode />} />
        <BottomNavigationAction icon={<DarkMode />} />
      </BottomNavigation>
    </ThemeProvider>
  )
}


