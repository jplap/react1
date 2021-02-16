//https://www.cluemediator.com/how-to-create-a-rating-component-in-react
import React from 'react';
import './square.css';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            controller: props.controller,
            qid: this.props.qid,
            id: parseInt(this.props.qid.toString() + this.props.value.toString()),
            score: 0
        };
        //this.question = props.question;
        props.controller.addSquare(this.props.value, this);

        this.CBMouseOver = this.CBMouseOver.bind(this)
        //this.id = parseInt(this.props.qid.toString() + this.props.value.toString());
        console.log("Square:constructor: id:" + this.state.id + " qid:" + this.state.qid + " value:" + this.state.value)



    }
    unclickElt(){
        document.getElementById(this.state.id).className = "ID0";
        var id1 = "ID0_"+this.state.id
        document.getElementById(id1).className = "ID0_number";
        this.state.controller.setScore(0);
    }
    reset( param ){
        document.getElementById(this.state.id).className = "ID0";
        var id1 = "ID0_"+this.state.id
        document.getElementById(id1).className = "ID0_number";
        let id= parseInt(param.qid.toString() + param.value.toString());
        console.log("Square:reset id:" + id + " qid:" + param.qid + " value:" + param.value );
        this.setState({
            value: param.value,
            controller: param.controller,
            qid: param.qid,
            id: id,
            score: 0

        });

    }
    CBMouseOver( event ){
        console.log("Square:mouseover:" + this.state.id)
    }
    componentDidMount() {
        console.log("Square:componentDidMount title:" + this.state.questionnaireTitle );
        let sid = document.getElementById(this.state.id);

        if ( sid ) {
            //this.CBMouseOver.bind(this)
            sid.addEventListener("mouseover", this.CBMouseOver )
        }
    }

    clickEltHandler = (e,data) => {
        this.state.controller.resetui();
        console.log("Square:clickHandler square id:" + this.state.id);
        //this.state.controller.score = parseInt(document.getElementById(this.state.id).getAttribute("value"))//e.currentTarget.id;
        this.state.controller.setScore( parseInt(document.getElementById(this.state.id).getAttribute("value")) )
        document.getElementById(this.state.id).className = "ID0_Clicked";
        var id1 = "ID0_"+this.state.id
        document.getElementById(id1).className = "ID0_number_clicked";


    }

    render() {
        console.log("Square:render id:" + this.state.id);
        var id1 = "ID0_"+this.state.id

        return (
            <Col xs="auto">

                <div id={this.state.id} className="ID0" value={this.state.value} onClick={(e) =>this.clickEltHandler(e,this)}>





                    <div id={id1} className="ID0_number">
                        <span>{this.state.value}</span>
                    </div>
                </div>
            </Col>
        );


        /*
        return (
            <Col xs="auto" id={this.state.id}   value={this.state.value} onClick={(e) =>this.clickEltHandler(e,this)}>




                {this.state.value}






            </Col>
        );

         */
    }
}
export default Square;
