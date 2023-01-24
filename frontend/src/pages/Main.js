import React from "react";
import freedge from './images/freedge.png';
import './styles/main.css';

function Main() {
    return (
        <>
        <section className="hero">
            <div className="container">
                <div className="left">
                    <span className="top">Hey!</span>
                    <h1 className="title">We are
                        <a href="/main" className="logo">
                            <span>FREE</span>DGE
                        </a>
                    </h1>
                    <p class="description">
                        Our goal is to reduce consumerism and reduce food waste.
                    </p>

                    <div className="cta">
                        <button className="btn fill">
                            <a href="mailto:konrad.tupta@gmail.com">
                                Contact Us
                            </a>
                        </button>

                        <button className="btn line">
                            <a href="/login">
                                Try Our Product
                            </a>
                        </button>
                    </div>
                </div>
                <div className="right">
                    <img src={freedge} />
                </div>
            </div>
        </section>
        </>

    );
}

export default Main;