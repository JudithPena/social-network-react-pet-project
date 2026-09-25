import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import SideBar from "./components/SideBar/SideBar";
function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-layout">
        <NavBar />
        <Profile />
        <SideBar />
      </main>
    </div>
  );
}

export default App;
