import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon, Button } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-camera';

export default class MyCamera extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.store = props.store;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
          this.store.addCameraPhoto(data);
        })
        .catch(err => {
          //console.error(err)
        });
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;
    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }
    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;
    if (this.state.camera.type === back) {
      icon = <MaterialIcon name="camera-rear" size={30} color="white" />
    } else if (this.state.camera.type === front) {
      icon = <MaterialIcon name="camera-front" size={30} color="white" />
    }
    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name='close' style={{ color: 'white' }}  />
          </Button>
          <Button transparent  onPress={this.switchType}>
            {this.typeIcon}
          </Button>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <Button transparent onPress={this.takePicture}>
              <Icon name="camera" style={{ color: 'white'}}/>
            </Button>
            ||
            null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});