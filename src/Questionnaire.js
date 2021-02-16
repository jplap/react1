import React from 'react';
import Question from './Question';
//import logobleu from './logo_bleu.png';
import './logo_bleu.png'
import './logo_bleu@2x.png'
//import axios from 'axios'
import './questionnaire.css';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';






class Questionnaire extends React.Component {
    constructor(props) {
        console.log("Questionnaire:constructor");
        super(props);

        this.collectResult = this.collectQuestionResultOnClick.bind(this);
        this.controller = props.controller;
        this.controller.setQuestionnaire(this);
        this.nextAutomatic = props.nextAutomatic;



        this.state = {
            questionnaireTitle: props.questionnaireTitle,
            questionnaireId: props.questionnaireId,
            questionIds: props.questionsIds,
            questionLabels: props.questionLabels,
            questionsInstances:  Array(props.questionsIds.length),
            progressBar: props.progressBar

        }



        console.log("Questionnaire:init title:" + this.state.questionnaireTitle + this.state.questionIds );

    }
    addQuestionInstance(indice, instance){
        let toto = this.state.questionsInstances;

        toto[indice] = instance;
        this.setState({
            questionsInstances: toto
        });
        //this.state.questionsInstances[qid] = instance;


    }
    consumeScore( question, score ){
        console.log("Questionnaire:consumeScore qid:" + question.getId() + " score:" + score );
        var cumulZero = 0
        for( let i=0; i<this.state.questionsInstances.length; i++){
            console.log("Questionnaire:consumeScore i:" + i + "score:" + this.state.questionsInstances[i].getScore() );
            if ( this.state.questionsInstances[i].getScore() === 0 ){
                cumulZero = cumulZero + 1;
            }
        }
        if ( this.nextAutomatic === true && cumulZero === 0 ){
            //Suivant automatique
            this.collectQuestionResultOnClick();
        }
    }
    componentWillUnmount() {
        console.log("Questionnaire:componentDidMount title:" + this.state.questionnaireTitle );
    }
    componentDidMount() {
        console.log("Questionnaire:componentDidMount title:" + this.state.questionnaireTitle );
    }
    reset(props){
        console.log("Questionnaire:reset" );
        this.controller = props.controller;
        this.controller.setQuestionnaire(this);
        this.setState({
            questionnaireTitle: props.questionnaireTitle,
            questionnaireId: props.questionnaireId,
            questionIds: props.questionsIds,
            questionLabels: props.questionLabels,
            progressBar: props.progressBar
            //questionsInstances:  Array(props.questionsIds.length)
        });
        for( let i=0; i<this.state.questionsInstances.length; i++){

            console.log("Questionnaire reset qid:" + props.questionsIds[i] + " label:" + props.questionLabels[i] +" score:" + this.state.questionsInstances[i].score);
            let param = {};
            param.indice = i;
            param.label = props.questionLabels[i];
            param.qid = props.questionsIds[i];

            this.state.questionsInstances[i].reset(param);

        }

    }


    renderQuestion(indice, qid, label) {
        console.log("Questionnaire:renderQuestion");

        return  <Question indice={indice} label={label}   qid={qid} controller={this}/>;



    }

    /**
     * Collect Data and ...
     */
    collectQuestionResultOnClick = ( ) => {
        console.log("Questionnaire:collectResult qid:" + this.state.questionnaireId );

        let page = {};
        page["id"] = this.state.questionnaireId;
        page["label"] = this.state.questionnaireTitle;

        let questions = [];

        for( let i=0; i<this.state.questionsInstances.length; i++){

            console.log("question qid:" + this.state.questionsInstances[i].getId() + " label:" + this.state.questionsInstances[i].getLabel() +" score:" + this.state.questionsInstances[i].getScore());
            if ( this.state.questionsInstances[i].getScore() <= 0 ){

                alert ("all response are mandatory");
                return;

            }
            let question = { };
            question["qid"] = this.state.questionsInstances[i].getId();
            question["label"] = this.state.questionsInstances[i].getLabel();
            question["score"] = parseInt(this.state.questionsInstances[i].getScore());

            questions.push(question);

        }

        page["questions"] = questions;
        console.log("Questionnaire:collectResult questions:" + JSON.stringify(questions) );

        this.controller.addQuestionnaireResult(page);

    }



    render() {
        console.log("Questionnaire:render title:" + this.state.questionnaireTitle);
        this.scrollTop();

        let renderQuestions=[];
        if (this.state.questionIds) {
            for (var i = 0; i < this.state.questionIds.length; i++) {


                renderQuestions.push(this.renderQuestion(i, this.state.questionIds[i], this.state.questionLabels[i]))

            }
        }




        if (this.nextAutomatic === true ){

            return (
                <Col>
                    <Row>




                        <Col>
                            <div className={"myProgressBar"}>{this.state.progressBar}</div>

                        </Col>

                    </Row>
                    <Row>


                        <div className="ctitle_t">{this.state.questionnaireTitle}</div>
                        <div className="cquestion_blk">
                            {renderQuestions}

                        </div>


                        <Col>
                            <div className={"myProgressBar"}>{this.state.progressBar}</div>

                        </Col>

                    </Row>

                </Col>
            );

        }else {
            return (
                <div>
                    <div className="ctitle_t">{this.state.questionnaireTitle}</div>
                    <div className="cquestion_blk">
                        {renderQuestions}
                    </div>

                    <div id="Suivant_area" onClick={(e) => this.collectQuestionResultOnClick()}>

                        <svg className="Rectangle_612">
                            <rect className="rectclass"/>
                        </svg>
                        <div id="Suivant">
                            <span>Suivant</span>
                        </div>

                    </div>

                </div>

            );
        }


        //ReactDOM.render(instance);



    }
    scrollTop()
    {
        console.log("SCROLLTOP")
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}
export default Questionnaire;

