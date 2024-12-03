// App.jsx
import './App.css';
import { LocationsProvider } from './context/LocationsContext';
import { PopupProvider } from './context/PopupContext';
import EventsMap from './pages/EventsMap/EventsMap';


function App() {

  return (
    <LocationsProvider>

    <PopupProvider>
      <div className='app'>
        <EventsMap />
      </div>
    </PopupProvider>
    </LocationsProvider>
  );
};

export default App;