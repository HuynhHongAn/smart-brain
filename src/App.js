import React, {Component} from 'react';
import './App.css';

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/Signin/Signin";
import Register from "./components/Register/Register";

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
            box: {},
            route: 'signin',
            isSignin: false,
            user: {
                id: "",
                name:"",
                email:"",
                entries:0,
                joined:"",
            }
        }
    }

    loadUser = (data) => {
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box
        const image =  document.getElementById('inputImage')
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiData.left_col * width,
            topRow: clarifaiData.top_row * height,
            rightCol: width - (clarifaiData.right_col * width),
            bottomRow: height - (clarifaiData.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box})
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
            response => {
                if (response) {
                    fetch("http://localhost:3000/image", {
                        method: "PUT",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            id: this.state.user.id,
                        })
                    })
                }
                this.displayFaceBox(this.calculateFaceLocation(response)) },
            err => { console.log("Error", err) }
        );
    }

    onRouteChange = (route) => {
        if (route === "signout") {
            this.setState({isSignin: false})
        } else if (route === "home") {
            this.setState({isSignin: true})
        }
        this.setState({route:route})
    }

    render() {
        return (
            <div className="App">
                <Particles
                    className={'particles'}
                    params={particleOptions}
                />
                <Navigation isSignin={this.state.isSignin} onRouteChange={this.onRouteChange}/>
                { this.state.route === "home"
                    ? <div>
                        <Logo/>
                        <Rank />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonClick={this.onSubmitButtonClick}
                        />
                        <FaceRecognition
                            box={this.state.box}
                            imageURL={this.state.imageURL}/>
                    </div>
                    : this.state.route === "signin" || this.state.route === "signout"
                        ? <SignIn onRouteChange={this.onRouteChange}/>
                        : <Register
                            loadUser={this.loadUser}
                            onRouteChange={this.onRouteChange}/>

                }



            </div>
        );
    }

}

export default App;
