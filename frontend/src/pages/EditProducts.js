import React, {useContext, useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {ValidContext} from "../functions/ValidContext";
import DatePicker from "react-datepicker";
import {Container, Col, Row} from "react-bootstrap";


function EditProducts() {
    const [initialValues, setInitialValues] = useState({
        name: "",
        make: "",
        details: "",
    });

    const [deadline, setDeadline] = useState(new Date());
    const navigate = useNavigate();
    const {validState} = useContext(ValidContext);
    let {id} = useParams();

    //Pobranie informacji o produkcie
    const getProductData = (username) => {
        axios.get(`http://localhost:8080/products/byID/${id}`).then((response) => {
            if (response.data) {
                if (username === response.data.username) {
                    setInitialValues({
                        name: response.data.name,
                        make: response.data.make,
                        details: response.data.details,
                    });
                    setDeadline(new Date(response.data.deadline));
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        });
    }

    // Sprawdzenie czy zalogowana osoba jest autoryzowana
    useEffect(() => {
        axios.get("http://localhost:8080/validation/valid", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                navigate('/');
            } else {
                getProductData(response.data.username);
            }
        });
    }, [validState, navigate]);

    const onSubmitEdit = (data) => {
        data.deadline = deadline;
        axios.patch(`http://localhost:8080/products/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            navigate(`/`);
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Nazwa Produktu jest wymagana"),
        make: Yup.string().required("Nazwa Producenta jest wymagana"),
        details: Yup.string().required("Szczegóły są wymagane")
    });

    return (
        <Container>
            <Row id="createProduct">
                <Col className="col-center">
                    <h1>Edycja danych</h1>
                    <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmitEdit}
                            validationSchema={validationSchema}>
                        <Form className="form">
                            <label>Nazwa Produktu</label>
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
                                <Col class="datePickerEditCol">
                                    <DatePicker className="datePickerEdit" minDate={new Date()} popperPlacement="top-end"
                                                selected={deadline} onChange={setDeadline} dateFormat={"Pp"} showTimeSelect/>
                                </Col>
                            </Row>
                            <button className="submitButton" type="submit">Zatwierdź</button>
                        </Form>
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProducts;