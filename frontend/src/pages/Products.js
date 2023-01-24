import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ValidContext} from "../functions/ValidContext";
import {Col, Row, Container} from "react-bootstrap";
import dayjs from "dayjs";


function Products() {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const {validState} = useContext(ValidContext);
    let {id} = useParams();

    //Pobranie informacji o produkcie
    const getProductData = (username) => {
        axios.get(`http://localhost:8080/products/byID/${id}`).then((response) => {
            if (response.data) {
                if (username === response.data.username && response.data.ended === false) {
                    setProduct(response.data);
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

    const back = () => {
        navigate(`/`);
    }

    const isOver = (deadline) => {
        if (dayjs(deadline).isBefore(dayjs())) {
            return " over";
        } else {
            return "";
        }
    }

    return (
        <Container>
            
            <Container className="parent-info">
            <h1>{product.name}</h1>
                <div className="info">
                    <Row>
                        <Col>
                            <Row className="title">
                                <div>Nazwa Produktu</div>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="text">
                                <div>{product.name}</div>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row className="title">
                                <div>Producent</div>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="text">
                                <div>{product.make}</div>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row className="title">
                                <div>Dodatkowe informacje</div>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="text">
                                <div id="details">{product.details}</div>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row className="title">
                                <div>Data przydatności do spożycia</div>
                            </Row>
                        </Col>
                        <Col>
                            <Row className={'text' + isOver(product.deadline)}>
                                <div>{dayjs(product.deadline).format("DD/MM/YYYY HH:mm")}</div>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row className="title">
                                <div>Autor</div>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="text">
                                <div>{product.username}</div>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                            <button onClick={back}>Wróć</button>
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default Products;