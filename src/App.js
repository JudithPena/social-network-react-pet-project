import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Friends from "./components/Friends/Friends";
import Header from "./components/Header/Header";
import Messages from "./components/Messages/Messages";
import NavBar from "./components/NavBar/NavBar";
import PageStub from "./components/PageStub/PageStub";
import Profile from "./components/Profile/Profile";
import SideBar from "./components/SideBar/SideBar";
import { FriendsProvider } from "./context/FriendsContext";
import { MessagesProvider } from "./context/MessagesContext";
import { PostsProvider } from "./context/PostsContext";
function App() {
  // The messages page needs the width of the right column for the chat
  const isMessages = useLocation().pathname.startsWith("/messages");

  return (
    <FriendsProvider>
      <MessagesProvider>
        <PostsProvider>
          <div className="App">
            <Header />
            <main className={`App-layout ${isMessages ? "App-layout--wide" : ""}`}>
              <NavBar />
              <section className="App-content">
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/profile/*" element={<Profile />} />
                  <Route path="/friends/*" element={<Friends />} />
                  <Route path="/groups" element={<PageStub title="Группы" />} />
                  <Route path="/messages/*" element={<Messages />} />
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
              {!isMessages && <SideBar />}
            </main>
          </div>
        </PostsProvider>
      </MessagesProvider>
    </FriendsProvider>
  );
}

export default App;
