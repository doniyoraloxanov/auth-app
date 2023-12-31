import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

import { toast } from "react-toastify";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const onSubmit = async (e) => {
    const { email, password } = e;
    try {
      const res = await login({ email, password })
        .unwrap()
        .catch((err) => {
          throw err;
        });
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="bg-red-500">Sign In</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: true,
            })}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: true,
            })}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New User?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;

//
