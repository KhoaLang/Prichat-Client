import "./sidebar.scss";
import Searchbar from "../Searchbar";
import ChatList from "../ChatList";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Searchbar />
      <ChatList />
    </aside>
  );
};

export default Sidebar;
