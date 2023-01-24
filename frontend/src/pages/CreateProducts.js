import React, {useContext, useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ValidContext} from "../functions/ValidContext";
import DatePicker from "react-datepicker"
import {Col, Container, Row} from "react-bootstrap";


function CreateProducts() {
    const initialValues = {
        name: "",
        make: "",
        details: "",
    };

    const [deadline, setDeadline] = useState(new Date());
    const navigate = useNavigate();
    const {validState} = useContext(ValidContext);

    // Sprawdzenie czy ktoś jest "zalogowany"
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, [navigate]);

    // Sprawdzenie czy zalogowana osoba jest autoryzowana
    useEffect(() => {
        axios.get("http://localhost:8080/validation/valid", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                navigate('/');
            }
        });
    }, [validState, navigate]);

    const onSubmitCreate = (data) => {
        data.deadline = deadline;
        axios.post("http://localhost:8080/products", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            navigate('/');
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Nazwa Produktu jest wymagana"),
        make: Yup.string().required("Nawa Producenta jest wymagana"),
        details: Yup.string().required("Szczegóły są wymagane")
    });

    return (
        <Container>
            <Row id="createProduct">
                <Col className="col-center">
                    <h1>Dodaj produkt</h1>
                    <Formik initialValues={initialValues} onSubmit={onSubmitCreate} validationSchema={validationSchema}>
                        <Form className="form">
                            <label>Nazwa produktu</label>
                            <ErrorMessage name="name" component="span"/>
                            <Field className="input" name="name"/>

                            <label>Producent</label>
                            <ErrorMessage name="make" component="span"/>
                            <Field className="input" name="make"/>

                            <label>Dodatkowe informacje</label>
                            <ErrorMessage name="details" component="span"/>
                            <Field className="input" id='details' component="textarea" name="details"/>

                            <label>Data przydatności do spożycia</label>
                            <Row>
                                <Col className="datePickerCol">
                                    <DatePicker className="datePicker" minDate={new Date()} popperPlacement="top-end"
                                                selected={deadline} dateFormat="Pp"
                                                onChange={setDeadline} showTimeSelect/>
                                </Col>
                            </Row>

                            <button className="submitButton" type="submit">Dodaj produkt</button>
                        </Form>
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateProducts;