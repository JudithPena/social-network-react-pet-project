import { Route, Routes } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Friends from "./components/Friends/Friends";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import PageStub from "./components/PageStub/PageStub";
import Profile from "./components/Profile/Profile";
import SideBar from "./components/SideBar/SideBar";
import { FriendsProvider } from "./context/FriendsContext";
import { PostsProvider } from "./context/PostsContext";
function App() {
  return (
    <FriendsProvider>
      <PostsProvider>
        <div className="App">
          <Header />
          <main className="App-layout">
            <NavBar />
            <section className="App-content">
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="/friends/*" element={<Friends />} />
                <Route path="/groups" element={<PageStub title="Группы" />} />
                <Route path="/messages" element={<PageStub title="Сообщения" />} />
                <Route path="/events" element={<PageStub title="События" />} />
                <Route path="/marketplace" element={<PageStub title="Маркетплейс" />} />
                <Route path="/saved" element={<PageStub title="Сохранённое" />} />
                <Route path="/settings" element={<PageStub title="Настройки" />} />
                <Route
                  path="*"
                  element={<PageStub title="Страница не найдена" text="Такой страницы нет. Выберите раздел в меню." />}
                />
              </Routes>
            </section>
            <SideBar />
          </main>
        </div>
      </PostsProvider>
    </FriendsProvider>
  );
}

export default App;
