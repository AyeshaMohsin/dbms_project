import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Add your registration logic here
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col sm={8} md={6} lg={4}>
          <div className="p-4 rounded shadow">
            <h2 className="text-center mb-4">Registration</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`form-control ${
                        formik.errors.password && formik.touched.password ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className={`form-control ${
                        formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
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

export default RegistrationForm;
