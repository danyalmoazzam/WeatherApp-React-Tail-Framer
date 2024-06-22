import Weather from './components/Weather'

const App = () => {
  return (
    <div className="w-full h-screen sm:h-[100vh] grid bg-no-repeat bg-cover bg-[url('./public/bg.png')]">
      <Weather />
    </div>
  )
}

export default App