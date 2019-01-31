import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  Animated,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { Constants } from 'expo';
import {Icon, SearchBar} from 'react-native-elements';
import { TabViewAnimated, TabBar } from 'react-native-tab-view'; // Version can be specified in package.json
import ContactsList from './components/ContactsList';


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

//START - ADNROID
const HEADER_HEIGHT = 140;
const COLLAPSED_HEIGHT = 50 + Constants.statusBarHeight;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - COLLAPSED_HEIGHT;
//END - ANDROID


//STATUS BAR
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


//START - STATUSBAR - IOS
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 42 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
//END - STATUSBAR - IOS


export default class TabView extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'First' },
        { key: '2', title: 'Second' },
        { key: '3', title: 'Third' },
      ],
      scroll: new Animated.Value(0),
    };
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderHeader = props => {
    const translateY = this.state.scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <View style={{zIndex:1}}>
      <MyStatusBar backgroundColor="#3250E0" barStyle="light-content" translucent/>
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <View
          style={styles.cover}>
          <View style={styles.overlay}>
            {/* <Text style={{color:'#000', fontSize:16, alignSelf:'center'}}>Logo BossLelang</Text> */}
          </View>
          <View style={styles.tabbar}>
            <SearchBar containerStyle={{backgroundColor:'#3250E0'}} inputContainerStyle={{backgroundColor:'#fff'}} placeholder='Mau cari apa ?'/>
          </View>
          {/* <TabBar {...props} style={styles.tabbar} /> */}
        </View>
      </Animated.View>
      </View>
    );
  };

  _renderScene = () => {
    return (
      <View style={{zIndex:0}}>
        <ContactsList
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        />
      </View>
    );
  };

  render() {
    return (

        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        >
        <Text>asdadd</Text>
        </TabViewAnimated>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
  },
  overlay: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#d6dcf8',
    zIndex:1
  },
  cover: {
    height: HEADER_HEIGHT,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabbar: {
    backgroundColor: '#3250E0',
    elevation: 0,
    shadowOpacity: 0,
    zIndex:1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    zIndex:1
  },
  appBar: {
    backgroundColor:'red',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: 'red',
  },
});
