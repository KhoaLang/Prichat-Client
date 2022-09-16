import "./login.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { loginAction } from "../../stores/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authReducer);

  const onFinish = () => {
    dispatch(
      loginAction({
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password"),
      })
    );
  };
  useEffect(() => {
    if (userInfo) {
      navigate(`/chatroom/${userInfo?.id}`);
    }
  }, [userInfo]);

  return (
    <div className="login d-flex justify-content-center align-items-center flex-column">
      <h3>Login</h3>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
