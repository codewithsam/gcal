import './App.css'
import CalendarMap from './CalendarMap';
import { SETTINGS } from "./constants";

function App() {

  return (
    <>
      <CalendarMap days={SETTINGS.DAYS} time={SETTINGS.TIME} />
    </>
  )
}

export default App
