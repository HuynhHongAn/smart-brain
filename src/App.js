import React, {Component} from 'react';
import './App.css';

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

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

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    onInputChange = (event) => {
        console.log(event)
    }

    onSubmitButtonClick = () => {
        console.log('click');
        const app = new Clarifai.App({
            apiKey: '62624119a6834bb7a18d45179147d3a7'
        });
        app.models.create(
            "pets",
            [
                { "id": "boscoe" }
            ]
        ).then(
            function(response) {
                // do something with response
                console.log(response)
            },
            function(err) {
                // there was an error
                console.log(err)
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
                <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onSubmitButtonClick}/>
            </div>
        );
    }

}

export default App;
