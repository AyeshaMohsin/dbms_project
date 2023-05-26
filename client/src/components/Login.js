import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useNavigate } from 'react-router';

const CustomerRegistrationForm = () => {
  const [disableFields, setDisableFields] = useState(false);
  const initialValues = {
    customer_email: '',
    customer_password: '',
  };

  const validationSchema = Yup.object().shape({
    customer_email: Yup.string().email('Invalid email').required('Required'),
    customer_password: Yup.string().required('Required'),
  });


  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      console.log(parseRes);
      parseRes === true ? (setDisableFields(true)
      ) : 
      (setIsAuthenticated(false)
      );
      if (parseRes) {
        // toast.error("Logout first!");
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (values) => {

    const customer_email = values.customer_email;
    const customer_password = values.customer_password;

    try {
      const body = {
        customer_email,
        customer_password,
      };


      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setDisableFields(true);
        toast.success("Log in Successful, Redirecting you to dashboard", {
          onClose: () => {
            navigate("/dashboard"); // Redirect to dashboard

          }
        });

      } else {
        toast.error(parseRes);
      }
    } catch (error) {
    }
  };

  if (isAuthenticated) {
    toast.error("Logout first");
  }



  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col sm={8} md={6} lg={4}>
          <div className="p-4 rounded shadow">
            <h2 className="text-center mb-4">Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <fieldset disabled={disableFields}>

                  <Form onSubmit={formik.handleSubmit}>

                    <Form.Group controlId="customer_email">
                      <Form.Label>Email:</Form.Label>
                      <Field
                        type="email"
                        name="customer_email"
                        placeholder="Enter your email"
                        className={`form-control ${formik.errors.customer_email && formik.touched.customer_email ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="customer_email" component="div" className="invalid-feedback" />
                    </Form.Group>

                    <Form.Group controlId="customer_password">
                      <Form.Label>Password:</Form.Label>
                      <Field
                        type="password"
                        name="customer_password"
                        placeholder="Enter your password"
                        className={`form-control ${formik.errors.customer_password && formik.touched.customer_password ? 'is-invalid' : ''
                          }`}
                      />
                      <ErrorMessage name="customer_password" component="div" className="invalid-feedback" />
                    </Form.Group>



                    <Button variant="primary" type="submit" className="mt-3 w-100">
                      Login
                    </Button>
                  </Form>
                </fieldset>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        type="success"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
};

export default CustomerRegistrationForm;
