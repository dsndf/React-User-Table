import React from 'react'
import Users from './components/Users/Users'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Users />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  )
}

export default App
