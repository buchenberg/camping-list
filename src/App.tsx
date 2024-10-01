
import CampingItemList from './components/CampingItemList';
import CampingListCounter from "./components/CampingListCounter";
import { createEventBus } from "@solid-primitives/event-bus";
import EventBusComponent from "./components/EventBusComponent";
import { createSignal, Match } from "solid-js";
import { Card, Button, Container, Nav, Navbar, NavDropdown, Tab, Tabs, Switch } from "solid-bootstrap";

export const eventBus = createEventBus<string>();


export default function App() {
  const [key, setKey] = createSignal('home');

  const renderTab = () => {
    switch (key()) {
      case 'items':
        return <CampingItemList />;
      default:
        return 'under construction';
    }
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#home">Camping List</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav class="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
      <Container fluid>
        <Card>
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={key()}
              onSelect={(k) => setKey(k as string)}
            >
              <Tab eventKey="home" title="Home" />
              <Tab eventKey="trips" title="Camping Trips" />
              <Tab eventKey="items" title="Camping Items" />
            </Tabs>
          </Card.Header>
          <Card.Body>
            {renderTab()}
          </Card.Body>
        </Card>

      </Container>

    </>
    // <ThemeProvider theme={theme}>
    //   <Box sx={{ flexGrow: 1 }} paddingBottom='56px'>
    //     <CssBaseline />
    //     <AppBar position="sticky" color="primary">
    //       <Toolbar>
    //         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //           Camping List
    //         </Typography>
    //         <CampingListCounter />
    //       </Toolbar>
    //     </AppBar>
    //     <Box paddingTop="56px"
    //       component="main"
    //       sx={{
    //         backgroundColor: (theme) =>
    //           theme.palette.mode === paletteMode()
    //             ? theme.palette.grey[100]
    //             : theme.palette.grey[900],
    //         flexGrow: 1,
    //         height: '100vh',
    //         overflow: 'auto',
    //       }}
    //     >
    //       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    //         <Grid container spacing={3}>
    //         <Grid item xs={12}>

    //             <Typography variant="body1" gutterBottom>
    //               This application is a proof of concept using <Link href="https://www.solidjs.com/" target="none">SolidJs</Link>, <Link href="https://suid.io/" target="none">SUID</Link>, and <Link href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" target="none">IndexedDb</Link> via <Link href="https://github.com/localForage/localForage" target="none">localForage</Link>
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12}>
    //             <CampingItemList />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <EventBusComponent />
    //           </Grid>
    //         </Grid>
    //       </Container>
    //     </Box>

    //   </Box>
    //   <BottomNavigation
    //     sx={{ position: 'fixed', bottom: 0, width: 1.0 }}
    //     showLabels
    //     value={value()}
    //     onChange={(_event, newValue: number) => {
    //       setValue(newValue);
    //       setPaletteMode(newValue === 0 ? "light" : "dark");
    //     }}>
    //     <BottomNavigationAction icon={<LightMode />} />
    //     <BottomNavigationAction icon={<DarkMode />} />
    //   </BottomNavigation>
    // </ThemeProvider>
  )
}


