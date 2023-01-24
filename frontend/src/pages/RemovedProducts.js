import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ValidContext} from "../functions/ValidContext";
import {Col, Container, Row} from "react-bootstrap";
import dayjs from "dayjs";

function RemovedProducts() {
    const [userInfo, setUserInfo] = useState({});
    const [listOfProducts, setListOfProducts] = useState([]);
    const navigate = useNavigate();
    const {setValidState} = useContext(ValidContext);
    const {validState} = useContext(ValidContext);
    let {id} = useParams();

    const getProducts = (username) => {
        axios.get(`http://localhost:8080/products/ended/${username}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setListOfProducts(response.data);
        });
    };

    const getUserData = (username) => {
        axios.get(`http://localhost:8080/validation/${id}`).then((response) => {
            if (response.data) {
                if (username === response.data.username) {
                    setUserInfo(response.data);
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
                getUserData(response.data.username);
                getProducts(response.data.username)
            }
        });
    }, [validState, navigate]);

    return (
        <Container className="removedProduct">
            <Container className="home-info">
                <h1>Usunięte Produkty</h1>
                {listOfProducts.length === 0 ? (
                    <h3 className="information">Brak usuniętych produktów</h3>
                ) : (
                    listOfProducts.map((value, index) => {
                        return (
                            <>
                                <div className="products" key={value.id}>
                                    <Row>
                                        <Col className="removedProducts" md='4'>
                                            {value.name}
                                        </Col>
                                        <Col className="removedProducts" md='4'>
                                            {value.make}
                                        </Col>
                                        <Col className="removedProducts" md='4'>
                                            {dayjs(value.deadline).format("DD/MM/YYYY HH:mm")}
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        );
                    })
                )}
            </Container>
        </Container>


    );
}

export default RemovedProducts;