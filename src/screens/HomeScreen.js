import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { WebBrowser } from 'expo'

import { MonoText } from '../components/StyledText'
import { Loading } from '../components/Loading'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      pokemonsLoaded: false, 
      next: null,
      defualtUrl: `https://pokeapi.co/api/v2/pokemon/?limit=0&offset=0`,
    };
  }

  componentDidMount() {
    this.getPokemons(this.state.defualtUrl, true)
  }

  getPokemons = async (url, refresh = false) => {
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let { pokemons } = this.state
        if (refresh) {
          pokemons = responseJson.results
        } else {
          Array.prototype.push.apply(pokemons, responseJson.results)
        }
        this.setState({ 
          pokemons: pokemons,
          next: responseJson.next,
          pokemonsLoaded: true 
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { pokemons, pokemonsLoaded } = this.state

    let pokemonList = <Loading />
    if (pokemonsLoaded) {
      pokemonList = <List containerStyle={{ marginBottom: 20 }}>
        {
          pokemons.map((pokemon, i) => (
            <ListItem
              key={i}
              title={pokemon.name}
              onPress={() => this.props.navigation.navigate('PokemonDetails', pokemon.url)}
            />
          ))
        }
      </List>
    }

    return (
      <View style={styles.container}>
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.contentContainer}
          refreshControl = {
            this._refreshControl()
          }
          onScroll = {(e) => {
            let paddingToBottom = 5;
            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
            if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
              this.getPokemons(this.state.next, false)
            }
          }}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          {pokemonList}
        </ScrollView>
      </View>
    );
  }

  _refreshControl() {
    return ( 
      <RefreshControl 
        refreshing = {false}
        onRefresh = {
          () => this.getPokemons(this.state.defualtUrl, true)
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
