import { useEffect } from "react";
import { Outlet, Routes, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import "./authenticate.scss";
import SignUp from "../../components/signup/SignUp";
import Login from "../../components/login/Login";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../stores/actions/AuthAction";

const { TabPane } = Tabs;

const Authenticate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   // navigate("/signup");
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <section className="authenticate d-flex justify-content-center align-items-center">
      <Tabs size="large" defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Sign Up" key="1" style={{ backgroundColor: "red" }}>
          <SignUp />
        </TabPane>
        <TabPane tab="Login" key="2">
          <Login />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default Authenticate;
