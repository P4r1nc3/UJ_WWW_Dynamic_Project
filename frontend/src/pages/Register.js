import React, {useState, useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Container, Col, Row, Alert} from 'react-bootstrap';
import {ValidContext} from "../functions/ValidContext";
import {Link} from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertType, setAlertType] = useState("");
    const {setValidState} = useContext(ValidContext);

    const setTimeAlert = () => {
        setShowAlert(true);
        window.setTimeout(() => {
                setShowAlert(false)
            }, 3000
        );
    };

    const initialValuesRegister = {
        username: "",
        email: "",
        password: "",
    };

    const onSubmitRegister = (data, args) => {
        axios.post("http://localhost:8080/validation", data).then((response) => {
            if (response.data.error) {
                setTimeAlert();
                setAlertText(response.data.error);
                setAlertType("danger");
            } else {
                setTimeAlert();
                setAlertText(response.data.success);
                setAlertType("success");
            }
            args.resetForm();
        });
    };

    const validationSchemaRegister = Yup.object().shape({
        username: Yup.string().required("Login nie moze być pusty"),
        email: Yup.string().required("Email jest nie moze być pusty").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Zła struktura emaila"),
        password: Yup.string().min(8, "Minimalna długość hasła to 8 znaków").required("Hasło nie moze być puste")
    });

    return (
        <Container>
            <Row id="alert" className="justify-content-md-center">
                <Col md='6'>
                    <Alert variant={alertType} show={showAlert} onClose={() => setShowAlert(false)}
                           dismissible>
                        {alertText}
                    </Alert>
                </Col>
            </Row>
            <Row id="register">
                <h1>Register</h1>
                <p>Already have an account? <Link to="/login" style={{ textDecoration: 'none', color:  '#17a349' }}> Login </Link></p>
                <Formik initialValues={initialValuesRegister} onSubmit={onSubmitRegister}
                        validationSchema={validationSchemaRegister}>
                    <Form className="form">

                        <label>Login</label>
                        <ErrorMessage name="username" component="span"/>
                        <Field autoComplete="off" className="input" name="username"/>

                        <label>Email</label>
                        <ErrorMessage name="email" component="span"/>
                        <Field autoComplete="off" className="input" name="email"/>

                        <label>Password</label>
                        <ErrorMessage name="password" component="span"/>
                        <Field autoComplete="off" type="password" className="input" name="password"/>

                        <button className="submitButton" type="submit">SignUp</button>
                    </Form>
                </Formik>
            </Row>
        </Container>
    );
}

export default Register;