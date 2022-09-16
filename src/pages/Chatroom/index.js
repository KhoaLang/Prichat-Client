import "./chatRoom.scss";
import Header from "../../components/header/Header";
import Sidebar from "../../components/Sidebar";
import { Row, Col } from "antd";
import Chatsection from "../../components/ChatSection";

const Chatroom = () => {
  return (
    <section className="chatroom">
      <Header />
      <Row style={{ height: "100%" }}>
        <Col md={5}>
          <Sidebar />
        </Col>
        <Col md={19}>
          <Chatsection />
        </Col>
      </Row>

      {/* <h1>Another</h1> */}
      {/* <Outlet /> */}
    </section>
  );
};

export default Chatroom;
