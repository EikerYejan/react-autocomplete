import './App.css'
import AutoComplete from './components/AutoComplete'
import mockOptions from './mocks/characters.json'

function App() {
  return (
    <div className="App">
      <AutoComplete options={mockOptions.data} label="Marvel Characters" placeholder="Type a name" />
    </div>
  )
}

export default App
