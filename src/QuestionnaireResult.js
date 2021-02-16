import React from 'react';
import ReactStoreIndicator from 'react-score-indicator'

import { Player } from 'video-react';
import "video-react/dist/video-react.css"; // import css




class QuestionnaireResult extends React.Component {
    constructor(props) {
        console.log("QuestionnaireResult:constructor");
        super(props);
         


        //this.clickHandler = this.clickHandler.bind(this);


        this.controller = props.controller;
        //this.controller.setQuestionnaireResult(this);


        this.state = {

            dataStr: JSON.stringify(props.QuestionnaireResultData.data)


        }



        console.log("QuestionnaireResult:init dataStr:" + JSON.stringify(props.QuestionnaireResultData.data ));

    }

    componentWillUnmount() {
        console.log("QuestionnaireResult:componentDidMount title:" + this.state.QuestionnaireResultTitle );
    }
    componentDidMount() {
        console.log("QuestionnaireResult:componentDidMount title:" + this.state.QuestionnaireResultTitle );
    }
    reset(props){
        console.log("QuestionnaireResult:reset" );

        this.setState({

            QuestionnaireResultData: props.QuestionnaireResultData,
        });


    }

    render() {
        console.log("QuestionnaireResult:render title:" + this.state.QuestionnaireResultTitle);

        var data = JSON.parse(this.state.dataStr);
        var abilities = data["abilities"];

        const items = []

        for (var i=0; i<abilities.length; i++) {



            items.push( <ReactStoreIndicator value={abilities[i].score} maxValue={10} /> )
            items.push(<h1><span>{abilities[i].label}</span></h1>)
        }


        return (
            <div>
                <div className="ctitle_t">{this.state.QuestionnaireResultTitle}</div>


                    {items}


                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
            </div>


        );


    }
}
export default QuestionnaireResult;

