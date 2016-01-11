'use strict';

var React = require('react-native');

const moveTolerance = 30;

var {
  Animated,
  PanResponder,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
      return {
        scale: new Animated.Value(1)
      };
  },
  getDefaultProps() {
      return {
          level: 1.1  
      };
  },
  _panResponder: {},
  componentWillMount() {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderTerminate: (evt, gestureState) => {
        },
        onPanResponderGrant: (evt, gestureState) => { 
          Animated.timing(         
            this.state.scale,    
            {
              toValue: this.props.level,
              friction:1,
              duration: 200
            },           
          ).start();  
        },

        onPanResponderRelease: (evt, gestureState) => {

          if ( gestureState.dy > moveTolerance ||  gestureState.dy < (-moveTolerance) || gestureState.dx > moveTolerance ||  gestureState.dx < (-moveTolerance)) {
          } else {
            setTimeout( () => { // 50ms delay makes it more natural

              Animated.spring(         
                this.state.scale,    
                {
                  toValue: 1,
                  friction:1,
                  duration: 200
                },           
              ).start(); 

              if ( this.props.onPress ) {
                this.props.onPress(); 
              }
            }, 50);
          } 
        },

      });  
  },
  render: function() {
    return (
        <Animated.View
          style={[{
              transform: [
                {
                  scale: this.state.scale
                }
              ]
            }, this.props.style
          ]}>
          <View
            {...this._panResponder.panHandlers}>
            <View>
              {this.props.children}
            </View>
          </View>
        </Animated.View>
    );
  }
});