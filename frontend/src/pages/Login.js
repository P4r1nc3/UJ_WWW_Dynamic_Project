import React, {useState, useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Container, Col, Row, Alert} from 'react-bootstrap';
import {ValidContext} from "../functions/ValidContext";
import {Link} from "react-router-dom";

function Login() {
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

    const initialValuesLogin = {
        username: "",
        password: "",
    };

    const onSubmitLogin = (data, args) => {
        axios.post("http://localhost:8080/validation/login", data).then((response) => {
            if (response.data.error) {
                setTimeAlert();
                setAlertText(response.data.error);
                setAlertType("danger");
                args.resetForm();
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setValidState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
                navigate("/");
            }
        });
    };

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
            <Row id="login">
                <h1>Login</h1>
                <p>Or <Link to="/register" style={{ textDecoration: 'none', color:  '#17a349' }}> Create an account </Link></p>
                <Formik initialValues={initialValuesLogin} onSubmit={onSubmitLogin}>
                    <Form className="form">

                        <label>Login</label>
                        <ErrorMessage name="username" component="span"/>
                        <Field autoComplete="off" className="input" name="username"/>

                        <label>Password</label>
                        <ErrorMessage name="password" component="span"/>
                        <Field autoComplete="off" type="password" className="input" name="password"/>

                        <button className="submitButton" type="submit">Login</button>
                    </Form>
                </Formik>
            </Row>
        </Container>
    );
}

export default Login;