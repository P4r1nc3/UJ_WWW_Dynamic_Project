import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ValidContext} from "../functions/ValidContext";
import {Container, Col, Row, Button} from "react-bootstrap";
import {AiOutlineCheck} from "react-icons/ai";
import {AiFillEye} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";
import dayjs from "dayjs";

import {useParams} from "react-router-dom";


function InStockProducts() {
    const [listOfProducts, setListOfProducts] = useState([]);
    const navigate = useNavigate();
    const {validState} = useContext(ValidContext);

    const [product, setProduct] = useState({});
    let {id} = useParams();

    //Pobranie produktów
    const getProducts = (username) => {
        axios.get(`http://localhost:8080/products/active/${username}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setListOfProducts(response.data);
        });
    };

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
                navigate('/login');
            } else {
                getProducts(response.data.username);
            }
        });
    }, [validState.status, navigate]);

    const endProduct = (id) => {
        axios.patch(`http://localhost:8080/products/end/${id}`, {}, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setListOfProducts(listOfProducts.filter((value) => {
                return value.id !== id;
            }));
        });
    }

    const editProduct = (id) => {
        navigate(`/edit/${id}`);
    }

    const showProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const isOver = (deadline)=>{
        if(dayjs(deadline).isBefore(dayjs())) {
            return " over";
        }
        else{
            return "";
        }
    }

    return (
        <Container className="home-info">
            <h1>Na stanie</h1>
            {listOfProducts.length === 0 ? (

                <h3 className="information">Brak produktów na stanie</h3>
            ) : (
                listOfProducts.map((value, index) => {
                    return (
                        <>
                            <div className="products" key={value.id}>
                                <Row>
                                    <Col className="product" md='2'>
                                        {value.name}
                                    </Col>

                                    <Col className="product" md='3'>
                                        {value.make}
                                    </Col>

                                    <Col className={'product' + isOver(value.deadline)} md='3'>
                                        {dayjs(value.deadline).format("DD/MM/YYYY HH:mm")}
                                    </Col>

                                    <Col className="buttonCol">
                                        {value.username === validState.username &&
                                            <Button className="detailsButton" onClick={() => showProduct(value.id)}><AiFillEye/>
                                            </Button>}

                                            {value.username === validState.username &&
                                            <Button className="editButton" onClick={() => editProduct(value.id)}><AiFillEdit/>
                                            </Button>}

                                        {value.username === validState.username &&
                                            <Button className="exitButton" onClick={() => {
                                                endProduct(value.id);
                                            } }><AiOutlineCheck/>
                                            </Button>}
                                    </Col>
                                </Row>
                            </div>
                        </>
                    );
                })
            )}
        </Container>
    );
}

export default InStockProducts;