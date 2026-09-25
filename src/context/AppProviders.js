import { EventsProvider } from "./EventsContext";
import { FriendsProvider } from "./FriendsContext";
import { GroupsProvider } from "./GroupsContext";
import { MarketProvider } from "./MarketContext";
import { MessagesProvider } from "./MessagesContext";
import { NotificationsProvider } from "./NotificationsContext";
import { PostsProvider } from "./PostsContext";
import { SavedProvider } from "./SavedContext";

// All app state in one place; order does not matter, the providers are independent
const AppProviders = ({ children }) => {
  return (
    <FriendsProvider>
      <MessagesProvider>
        <PostsProvider>
          <EventsProvider>
            <GroupsProvider>
              <SavedProvider>
                <MarketProvider>
                  <NotificationsProvider>{children}</NotificationsProvider>
                </MarketProvider>
              </SavedProvider>
            </GroupsProvider>
          </EventsProvider>
        </PostsProvider>
      </MessagesProvider>
    </FriendsProvider>
  );
};

export default AppProviders;
