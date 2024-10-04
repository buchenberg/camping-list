
import CampingItemList from './components/tabs/CampingItemList';
import { createSignal, createEffect, Show } from "solid-js";
import { Card, Container, Navbar, Tab, Tabs, Row, Nav } from "solid-bootstrap";
import CampingTripList from './components/tabs/CampingTripList';
import CampingListHome from './components/tabs/CampingListHome';
import EventBusComponent from './components/EventBusComponent';
import CampingListCounter from './components/CampingListCounter';
import i18next from 'i18next';
import LoadingSpinner from './components/LoadingSpinner';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTransContext } from '@mbarzda/solid-i18next';

export default function App() {

  const [key, setKey] = createSignal('home');
  const [isReady, setIsReady] = createSignal(false);
  const [t] = useTransContext();

  createEffect(() => {
    i18next
      .init({
				// Default language.
        lng: "en-US",
				// Logging i18next information to the console.
        debug: true,
				// Interpolation option to escape passed in
        // values to avoid XSS injection.
        interpolation: {
          escapeValue: true,
        },
				// Language to use if translations in the
        // active language are not available.
        fallbackLng: false,
				// Resources i18next will use to retrieve
        // the appropriate translations based on
        // the active locale.
				resources: {
          "en-US": {
            translation: {
              "welcome_message": "Welcome Campers",
              "camping_list_title": "Camping List",
              "camping_list_header": "You can add camping items here. Go ahead. All the cool kids are doing it.",
              "home_tab_header": "Home",
              "camping_item_list_tab_header": "Camping Items",
              "camping_trip_list_tab_header": "Camping Trips",
              "item_name_table_header": "Item Name",
              "uom_table_header": "Unit of Measure",
              "qty_table_header": "Quantity",
              "add_new_item": "Add New Item",
              "clear_all_items": "Clear All Items"
          }
          },
          "es-ES": {
            translation: {
              "welcome_message": "Bienvenidos Campistas",
              "camping_list_title": "Lista de Acampada",
              "camping_list_header": "Puede agregar artículos para acampar aquí. Adelante. Todos los chicos geniales lo están haciendo.",
              "home_tab_header": "Hogar",
              "camping_item_list_tab_header": "Artículos para Acampar",
              "camping_trip_list_tab_header": "Viajes de Campamento",
              "item_name_table_header": "Nombre del Artículo",
              "uom_table_header": "Unidad de Medida",
              "qty_table_header": "Cantidad",
              "add_new_item": "Agregar Nuevo Artículo",
              "clear_all_items": "Borrar Todos Los Artículos"
          }
          },
        },
      })
      setIsReady(true);
  });


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
      <Show when={isReady()} fallback={<LoadingSpinner/>}>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container fluid>
            <Navbar.Brand href="#home">{t("camping_list_title")}</Navbar.Brand>
            <Nav>
              <Nav.Link onClick={() => setKey("items")}><CampingListCounter /></Nav.Link>
            </Nav>
            <LanguageSwitcher/>
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
                <Tab eventKey="home" title={t("home_tab_header")} />
                <Tab eventKey="items" title={t("camping_item_list_tab_header")} />
                <Tab eventKey="trips" title={t("camping_trip_list_tab_header")} />
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
      </Show>
  )
}


