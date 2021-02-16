import React from 'react';

import Board from './Board';

import './App.css';
import logobleu from "./logo_bleu.png";
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
//https://reactstrap.github.io/components/layout/
function App() {
  return (
    <Container>
        <Row md={10}>
            <Col>
                <img id="logo_bleu" src={logobleu} />
            </Col>
        </Row>
        <Row md={10}>
            <Col>

            </Col>
        </Row>
        <Row md={10}>

        </Row>
        <Row fluid="sm">
            <div className="cboard">


                    <Board/>
                </div>

        </Row>
    </Container>
  );
}

export default App;
