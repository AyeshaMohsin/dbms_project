import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CustomerRegistrationForm = () => {
  const initialValues = {
    customer_name: '',
    customer_email: '',
    customer_password: '',
    customer_confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    customer_name: Yup.string().required('Required'),
    customer_email: Yup.string().email('Invalid email').required('Required'),
    customer_password: Yup.string().required('Required'),
    customer_confirmPassword: Yup.string()
      .oneOf([Yup.ref('customer_password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    console.log(values.customer_name);
    console.log(values.customer_email);
    console.log(values.customer_password);
    // Add your CustomerRegistration logic here
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col sm={8} md={6} lg={4}>
          <div className="p-4 rounded shadow">
            <h2 className="text-center mb-4">Customer Registration</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="customer_name">
                    <Form.Label>Name:</Form.Label>
                    <Field
                      type="text"
                      name="customer_name"
                      placeholder="Enter your name"
                      className={`form-control ${formik.errors.customer_name && formik.touched.customer_name ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="customer_name" component="div" className="invalid-feedback" />
                  </Form.Group>

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
                      className={`form-control ${
                        formik.errors.customer_password && formik.touched.customer_password ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="customer_password" component="div" className="invalid-feedback" />
                  </Form.Group>

                  <Form.Group controlId="customer_confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Field
                      type="password"
                      name="customer_confirmPassword"
                      placeholder="Confirm your password"
                      className={`form-control ${
                        formik.errors.customer_confirmPassword && formik.touched.customer_confirmPassword ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="customer_confirmPassword" component="div" className="invalid-feedback" />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3 w-100">
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerRegistrationForm;
