import { EventsProvider } from "./EventsContext";
import { FriendsProvider } from "./FriendsContext";
import { GroupsProvider } from "./GroupsContext";
import { MessagesProvider } from "./MessagesContext";
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
              <SavedProvider>{children}</SavedProvider>
            </GroupsProvider>
          </EventsProvider>
        </PostsProvider>
      </MessagesProvider>
    </FriendsProvider>
  );
};

export default AppProviders;
