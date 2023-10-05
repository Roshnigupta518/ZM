import React from 'react';
import {Dimensions, StyleSheet, View, Button, Text} from 'react-native';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // Todo: log error
  }

  renderFallbackUI = () => {
    return (
      <>
       
        <View style={styles.cont}>
         
          <Text>Some Error Occured! Please try again</Text>
          <View style={styles.btnCont}>
            <Button
              onPress={() =>
                this.setState({
                  hasError: false,
                })
              }
              title={'Retry'}
            />
          </View>
        </View>
      </>
    );
  };

  render() {
    const RenderFallbackUI = this.renderFallbackUI;

    console.log({hasError: this.state.hasError});

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <RenderFallbackUI />;
      // return <Text>Something is wrong</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center"
  },
  img: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    // alignSelf: 'center',
    resizeMode: 'contain',
  },
  btnCont: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 10,
  },
 
});
