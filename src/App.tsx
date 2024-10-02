
import CampingItemList from './components/tabs/CampingItemList';
import CampingListCounter from "./components/CampingListCounter";
import { createEventBus } from "@solid-primitives/event-bus";
import EventBusComponent from "./components/EventBusComponent";
import { createSignal, Match } from "solid-js";
import { Card, Button, Container, Nav, Navbar, NavDropdown, Tab, Tabs, Switch, Row } from "solid-bootstrap";
import CampingTripList from './components/tabs/CampingTripList';
import CampingListHome from './components/tabs/CampingListHome';

export const eventBus = createEventBus<string>();


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
            </Card.Body>
          </Card>
        </Row>
      
    </>
  )
}


