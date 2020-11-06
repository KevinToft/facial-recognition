import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
      number: {
          value: 12,
          density: {
            enable: true,
            value_area: 100
          }
      }
  }
}

const app = new Clarifai.App({
 apiKey: '7bb56a86c8534ff3bab1c0f2e9017e09'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '', 
      imageUrl: ''
    } 
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value}); 
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});

    // app.models.initModel({id: Clarifai.FACE_DETECT_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    //   .then(faceDetectModel => {
    //     return faceDetectModel.predict("@@sampleTrain");
    //   })
    //   .then(response => {
    //     var concepts = response['outputs'][0]['data']['concepts']
    //   })

    //alt model. replase Clarifai.FACE_DETECT_MODEL with 'c0c0ac362b03416da06ab3fa36fb58e3'
    app.model.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err)
      }
    );
  }

  render () {
    return (
      <div className="App">
         <Particles 
                className='particles'
                params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
