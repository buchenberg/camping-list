
import CampingItemList from './components/tabs/CampingItemList';
import { createSignal } from "solid-js";
import { Card, Container, Navbar, Tab, Tabs, Row, Nav } from "solid-bootstrap";
import CampingTripList from './components/tabs/CampingTripList';
import CampingListHome from './components/tabs/CampingListHome';
import EventBusComponent from './components/EventBusComponent';
import CampingListCounter from './components/CampingListCounter';



export default function App() {
  const [key, setKey] = createSignal('home');

  const renderTab = () => {
    switch (key()) {
      case 'items':
        return <CampingItemList />;
      case 'trips':
        return <CampingTripList />
      default:
        return <CampingListHome />;
    }
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#home">Camping List</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => setKey("items")}><CampingListCounter/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Row>
        <Card class="cl-tab-card">
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={key()}
              onSelect={(k) => setKey(k as string)}
            >
              <Tab eventKey="home" title="Home" />
              <Tab eventKey="items" title="Camping Items" />
              <Tab eventKey="trips" title="Camping Trips" />
            </Tabs>
          </Card.Header>
          <Card.Body>
            {renderTab()}
            <div class="d-flex justify-content-center fixed-bottom p-2 m-2">
              <EventBusComponent />
            </div>
          </Card.Body>
        </Card>
      </Row>

    </>
  )
}


