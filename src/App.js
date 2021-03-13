import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const app = new Clarifai.App({
 apiKey: '7bb56a86c8534ff3bab1c0f2e9017e09'
});

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


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '', 
      imageUrl: '', 
      box: {},
      route: 'signin',
      isSignedIn: false
    } 
  }

  //based on provided image, calculate size of box to be rendered
  calculateFaceBox = (data) => {
    console.log(data);
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: face.left_col * width,
      right: width - (face.right_col * width),
      top: face.top_row * height,
      bottom: height - (face.bottom_row * height)
    }
  }

  placeFaceBorder = (box) => {
    console.log(box);
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value}); 
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.placeFaceBorder(this.calculateFaceBox(response)))
      .catch(e => console.log(e));
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
    
  }

  render () {
    const {isSignedIn, imageUrl, route, box} = this.state
    return (
      <div className="App">
         <Particles 
                className='particles'
                params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : route === 'signin' 
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
