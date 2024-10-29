import './App.css';
import { PopupProvider } from './context/PopupContext';
import EventsMap from './pages/EventsMap/EventsMap';

function App() {

  return (
    <PopupProvider>
      <div className='app'>
        <EventsMap />
      </div>
    </PopupProvider>

  );
};

export default App;
