import './App.css'
import APIDataAutoComplete from './components/APIDataAutoComplete'
import MockDataAutoComplete from './components/MockDataAutoComplete'

function App() {
  return (
    <div className="App">
      <MockDataAutoComplete />
      <APIDataAutoComplete />
    </div>
  )
}

export default App
