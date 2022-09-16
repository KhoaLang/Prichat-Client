import Authenticate from "./pages/authenticate/Authenticate";
import { Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/Chatroom";
import "./App.scss";

import "antd/dist/antd.less";
import { ProtectedRoute } from "./components/commons/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="chatroom/:userId" element={<ChatRoom />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
