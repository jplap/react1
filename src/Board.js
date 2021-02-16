import React from 'react';

//import logobleu from './logo_bleu.png';
import './logo_bleu.png'
import './logo_bleu@2x.png'
import axios from 'axios'
import Questionnaire from "./Questionnaire";
import QuestionnaireResult from "./QuestionnaireResult";
import './board.css';
import data from "./data/ui.json"

import { Steps } from 'rsuite';
//https://v3.rsuitejs.com/en/components/overview#Layout
import 'rsuite/dist/styles/rsuite-default.css';



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.page = 1;
        //this.clickHandler = this.clickHandler.bind(this);
        this.numberQuestion = 5;

        this.questionsInstance = Array(this.numberQuestion);

        this.state = { name: "React Component reload sample" };

        this.dataOutput = {};
        this.dataOutput["abilities"] = [];
        //this.getData();
        //console.log("${process.env.PUBLIC_URL}:" + `${process.env.PUBLIC_URL}` );
        console.log("uiData" + data);
        this.uiData = data;

        this.pageNbr = this.uiData.length;

        this.nextAutomatic = true;


    }

    setInstance(qid, instance){
        this.questionsInstance[qid] = instance;
    }
    setQuestionnaire ( q ){
        this.questionnaire = q;
    }





    /*firstQuestionnaire(){
        console.log("Board:firstQuestionnaire");
        let questionIds = [
            10,
            11,
            12,
            13,
            14
        ];
        let questionnaireId = "qid1"
        let questionLabels =[
            "Dans mon sport, je suis déterminé à ne rien lâcher",
            "Deuxieme question",
            "Question numero 3",
            "Question numero 4",
            "Question numero 5"
        ];
        let questionnaireTitle = "title Engagement";
        return  <Questionnaire questionnaireId = {questionnaireId} questionsIds={questionIds} questionLabels={questionLabels} questionnaireTitle={questionnaireTitle} controller={this}/>;


    }*/
    nextQuestionnaireResult( page, mode){

        let QuestionnaireResultTitle = page.questionnaireTitle;
        let QuestionnaireResultId = page.questionnaireId;
        let QuestionnaireResultData = this.QuestionnaireResultData;
        console.log("Board:nextQuestionnaireResult questionnaireResultTitle: " + QuestionnaireResultTitle)
        return  <QuestionnaireResult nextAutomatic = {this.nextAutomatic} QuestionnaireResultData={QuestionnaireResultData} QuestionnaireResultId={QuestionnaireResultId} QuestionnaireResultTitle={QuestionnaireResultTitle} controller={this}/>;

    }
    nextQuestionnaire(  mode){
        console.log("Board:nextQuestionnaire");
        let page = this.uiData[this.page - 1];
        let questionIds = page.questionIds;
        let questionnaireId = page.questionnaireId;
        let questionLabels = page.questionLabels;
        let questionnaireTitle = page.questionnaireTitle;

        const items = []

        for (var i=0; i<this.uiData.length; i++) {

            if (this.uiData[i].type === "questionnaire") {
                var title = "Waiting"
                if (i < this.page - 1) {
                    title = "Finished";
                } else if (i === this.page - 1) {
                    title = "In Progress";
                }
                var description = this.uiData[i].questionnaireTitle;

                items.push(<Steps.Item title={title} description={description}/>)
            }
        }
        /*
        <Steps.Item title="Finished" description={this.state.questionnaireId} />
                        <Steps.Item title="In Progress" description="This is a description." />
                        <Steps.Item title="Waiting" description="This is a description." />
                        <Steps.Item title="Waiting" description="This is a description." />
         */
        const progressBar = (
            <Steps current={this.page-1}>
                {items}
            </Steps>
        );


        if (mode === true) {
            let props = {};
            props.questionnaireId = questionnaireId;
            props.questionsIds = questionIds;
            props.questionLabels = questionLabels;
            props.questionnaireTitle = questionnaireTitle;
            props.controller = this;
            props.progressBar = progressBar

            this.questionnaire.reset(props);
        }


        return  (
            <div>
              <Questionnaire progressBar={progressBar} nextAutomatic = {this.nextAutomatic} questionnaireId = {questionnaireId} questionsIds={questionIds} questionLabels={questionLabels} questionnaireTitle={questionnaireTitle} controller={this}/>

            </div>
        )
    }
    /*secondQuestionnaire(){
        console.log("Board:secondQuestionnaire");
        let questionIds = [
            20,
            21,
            22,
            23,
            24
        ];
        let questionnaireId = "qid2"
        let questionLabels =[
            "Premiere question 21",
            "Deuxieme question 22",
            "Question numero 23",
            "Question numero 24",
            "Question numero 25"
        ];
        let questionnaireTitle = "titre2";
        let props = {};
        props.questionnaireId = questionnaireId;
        props.questionsIds = questionIds;
        props.questionLabels = questionLabels;
        props.questionnaireTitle = questionnaireTitle;
        props.controller = this;


        //this.questionnaire.init(props);
        this.questionnaire.reset(props);
        return <Questionnaire questionnaireId = {questionnaireId} questionsIds={questionIds} questionLabels={questionLabels} questionnaireTitle={questionnaireTitle} controller={this}/>;



    }*/
    addQuestionnaireResult(page ){
        console.log("Board:addResult");
        this.dataOutput["abilities"].push(page);

        this.page = this.page + 1;
        // Page suivante
        this.setState({ name: "React Component Updated - " + new Date() });
        console.log("this.page: " + this.page + " this.dataOutput:", this.dataOutput);
    }
    compute( page ){
        this.page = this.page + 1;
        axios({
            method: 'post',     //put
            url: page.uri,
            //headers: {'Authorization': 'Bearer'+token},
            data: this.dataOutput
        }).then(response=>{
            console.log(response);
            this.QuestionnaireResultData = response;
            //alert ("moyenne");
            this.setState({ name: "React Component Updated - " + new Date() });
        })
    }
    render() {
        console.log("Board:render page:", this.page + " type:" + this.uiData[this.page - 1].type);
        /*
        if ( this.page === 1 ) {
            return this.firstQuestionnaire();
        }else if ( this.page === 2 ) {
            return this.secondQuestionnaire();
        }else{
            this.compute();
            return null;
        }*/


        if ( this.page <= this.pageNbr) {
            if (this.uiData[this.page - 1].type === "questionnaire") {
                var mode = false
                if (this.page > 1)
                    mode = true

                return this.nextQuestionnaire(  mode);

                //}else{
            } else if (this.uiData[this.page - 1].type === "serverestapi") {
                this.compute(this.uiData[this.page - 1]);
                return null;
            }else if (this.uiData[this.page - 1].type === "questionnaireresult") {
                return this.nextQuestionnaireResult( this.uiData , mode);
            }
        }else{
            alert("fini")

        }





    }
}
export default Board;

