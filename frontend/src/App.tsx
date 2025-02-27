import './App.css'
import Header from "./Components/header"
import Featured from './Components/featured'
import List from "./Components/list"
import DigitalFooter from './Components/footer'
import EditContent from './Components/editContent'

export default function App() {
  return(
    <>
      <Header/>
      <Featured/>
      <EditContent/>
      <List/>
      <DigitalFooter/>
    </>
  )
}
