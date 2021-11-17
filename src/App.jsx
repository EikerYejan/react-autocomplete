import APIDataAutoComplete from './components/APIDataAutoComplete'
import APIDataWithHooks from './components/APIDataWithHooks'
import MockDataAutoComplete from './components/MockDataAutoComplete'
import './App.css'

function App() {
  return (
    <div className="App">
      <MockDataAutoComplete />
      <APIDataAutoComplete />
      <APIDataWithHooks />
    </div>
  )
}

export default App
