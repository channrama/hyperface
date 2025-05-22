import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
      <h1>Expense tracker</h1>
      <div>
        
        <form>
         
          <div>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" placeholder="Enter amount..." />
          </div>
          <div>
            <label htmlFor="type">type</label>
            <input type="text" id="type" placeholder="credit or debit" />
          </div>
          <div>
            <label htmlFor="category">category</label>
            <input type="text" id="amount" placeholder="Food transport shopping" />
          </div>
          <div>
            <label htmlFor="description">category</label>
            <input type="text" id="amount" placeholder="optional" />
          </div>
          <button type="submit">Add transaction</button>

         </form>
      </div>
    </div>
    </>
  )
}

export default App
