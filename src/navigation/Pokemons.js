import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen'

export default createStackNavigator(
    {
        Pokemon: HomeScreen,
        PokemonDetails: DetailsScreen,
    },
    {
        initialRouteName: 'Pokemon',
    }
)
