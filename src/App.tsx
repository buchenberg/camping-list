import CampingItemList from './components/tabs/CampingItemList';
import { createSignal } from "solid-js";
import CampingTripList from './components/tabs/CampingTripList';
import CampingListHome from './components/tabs/CampingListHome';
import EventBusComponent from './components/EventBusComponent';
import CampingListCounter from './components/CampingListCounter';
import "98.css";

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#008080',
    overflow: 'hidden'
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: '25px',
  },
  navbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem'
  },
  mainContent: {
    flex: 1,
    padding: '1rem',
    overflow: 'auto',
    background: '#008080'
  },
  tabList: {
    display: 'flex',
    gap: '4px',
    marginBottom: '-2px'
  },
  tab: {
    padding: '4px 8px',
    cursor: 'pointer',
    background: '#c0c0c0',
    border: '2px solid #dfdfdf',
    borderBottom: 'none'
  },
  activeTab: {
    background: '#dfdfdf',
    borderBottom: '2px solid #dfdfdf',
    position: 'relative',
    top: '2px'
  }
} as const;

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
    <div class="window" style={styles.appContainer}>
      <div style={styles.navbar}>
        <div class='title-bar' style={{padding: '0.5rem'}}>
          <div class="title-bar-text">Camping List</div>
          <div><CampingListCounter /></div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div class="window" style="width: 100%; height: 100%;">
          <div class="title-bar">
            <div class="title-bar-text">
              {key() === 'home' ? 'Home' : key() === 'items' ? 'Camping Items' : 'Camping Trips'}
            </div>
          </div>
          <div class="window-body" style="padding: 0.5em">
            <div style={styles.tabList}>
              <button 
                style={{ 
                  ...styles.tab, 
                  ...(key() === 'home' ? styles.activeTab : {})
                }}
                onClick={() => setKey('home')}
              >
                Home
              </button>
              <button 
                style={{ 
                  ...styles.tab, 
                  ...(key() === 'items' ? styles.activeTab : {})
                }}
                onClick={() => setKey('items')}
              >
                Camping Items
              </button>
              <button 
                style={{ 
                  ...styles.tab, 
                  ...(key() === 'trips' ? styles.activeTab : {})
                }}
                onClick={() => setKey('trips')}
              >
                Camping Trips
              </button>
            </div>
            <div style="padding: 1em; height: calc(100% - 40px); overflow: auto;">
              {renderTab()}
            </div>
          </div>
        </div>
      </div>
      <div style="position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%); z-index: 1000;">
        <EventBusComponent />
      </div>
    </div>
  );
}


