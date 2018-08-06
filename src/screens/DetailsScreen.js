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
    ActivityIndicator
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText'
import Loading from '../components/Loading'

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            pokemon: null,
            pokemonLoaded: false
        };
    }

    componentDidMount() {
        const { navigation: { state: { params } } } = this.props
        this.getPokemon(params)
    }

    getPokemon(url) {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ pokemon: responseJson, pokemonLoaded: true });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { pokemon, pokemonLoaded } = this.state

        return (
            pokemonLoaded ? <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.getStartedText}>{pokemon.name}</Text>
                        <Image
                            source={{
                                uri: pokemon.sprites.back_default
                            }}
                            style={styles.welcomeImage}
                        />
                    </View>
                    <View style={styles.getStartedContainer}>

                        <Text style={styles.getStartedText}>Abilities</Text>
                        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                            {pokemon.abilities.map((ability, i) => (
                                <Text
                                    key={`ability${i}`}
                                    style={styles.getStartedText}
                                >{ability.ability.name}</Text>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View> : <Loading />
        );
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
        width: 150,
        height: 120,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
});
