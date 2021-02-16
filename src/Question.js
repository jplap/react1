import React from 'react';
import Square from './Square';
import './question.css';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            qid: props.qid,
            indice: props.indice,
            squares :  []
        };
        this.score= 0;
        this.controller = props.controller;

        console.log("Question:constructor qid: "+ props.qid);
        //this.controller.setInstance(this.state.qid,this);
        this.controller.addQuestionInstance(this.state.indice,this);

    }
    getId(){
        return this.state.qid;
    }
    getLabel(){
        return this.state.label;
    }
    getScore(){
        return this.score;
    }
    setScore(score){
        this.score = score;
        this.controller.consumeScore(this,score)

    }
    componentDidMount() {
        console.log("Question:componentDidMount");
    }
    addSquare( indice, square){
        this.state.squares[indice] = square;
    }
/*
    renderSquare(i) {
        return <Square qid={this.state.qid} value={i} controller={this}/>;
    }

 */
    reset( param ){
        console.log("Question:reset");
        this.setState({
            label: param.label,
            qid: param.qid,
            indice: param.indice

        });
        this.score= 0;
        this.controller.addQuestionInstance(param.indice,this);
        for (var i=0; i<this.state.squares.length; i++){
            if ( this.state.squares[i] ){
                var param1 = {};
                param1.qid = param.qid;
                param1.value = i;
                param1.controller = this;
                this.state.squares[i].reset(param1);
            }

        }
    }
    resetui(){
        for (var i=0; i<this.state.squares.length; i++){
            if ( this.state.squares[i] ){

                this.state.squares[i].unclickElt();
            }

        }
    }

    render() {
        console.log("Question:render");
        let items = []
        for (var i=0; i<10; i++){
            items.push(<Square   qid={this.state.qid} value={i+1} controller={this}/>)
        }

        return (
            <div>

                <div className="cquestion">{this.state.label}</div>
                <Row>
                    <Col>

                            {items}


                    </Col>
                </Row>


            </div>
        );
    }
}
export default Question;
