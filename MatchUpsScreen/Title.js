import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import theme from '../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons';


const Title = ({ name, location, iconName, distance }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 15 }}>
            <View>
                <Text style={[theme.FONTS.largeLightTitle, { color: '#fff', fontSize: theme.SIZES.body1 }]}>{name}</Text>
                <Text style={[theme.FONTS.body4, { color: '#fff' }]}>{location} </Text>

            </View>
            <View style={{display:'flex',flexDirection: 'column',justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Icon name="heart-half" size={25} color={theme.COLORS.darkGreen} />
                <Text style={[theme.FONTS.body4, { color: '#fff' }]}>
                    {(Math.round(distance * 100) / 100).toFixed(2)} Km
                </Text>
            </View>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({})
