import React, {Component} from 'react';
import './App.css';

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const particleOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

const app = new Clarifai.App({
    apiKey: '233761c75db843b892dc2ca8a652ba80'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageURL: '',
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onSubmitButtonClick = () => {
        this.setState({imageURL: this.state.input});

        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input,
        ).then(
            function(response) {
                // do something with response
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
            },
            function(err) {
                // there was an error
                console.log("Error", err)
            }
        );
    }

    render() {
        return (
            <div className="App">
                <Particles
                    className={'particles'}
                    params={particleOptions}
                />
                <Navigation />
                <Logo/>
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonClick={this.onSubmitButtonClick}
                />
                <FaceRecognition imageURL={this.state.imageURL}/>

            </div>
        );
    }

}

export default App;
