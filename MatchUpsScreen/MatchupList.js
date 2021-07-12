import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, Animated, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../constants/theme'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import Title from './Title';
import GetLocation from 'react-native-get-location'
import { getDistance, convertDistance } from 'geolib';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import Actions from './Actions';

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = theme.SIZES.width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.8;
const VISIBLE_ITEMS = 4;

const MatchupList = ({ navigation, scrollXAnimated, data, style }) => {

    const [curruntPosition, setcurruntPosition] = useState({})

    React.useEffect(async () => {
        await asynchronousFunction()
    }, [])


    const asynchronousFunction = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(res => {
            setcurruntPosition({ latitude: res.latitude, longitude: res.longitude })
        });
    }


    

    return (
        <View style={style}>
            <FlatList
                data={data}
                keyExtractor={ (_, index) => `item-${index}`}
                horizontal
                inverted
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: SPACING * 2,
                }}
                scrollEventThrottle={16}
                scrollEnabled={false}
                removeClippedSubviews={false}
                CellRendererComponent={({ item, index, children, style, ...props }) => {
                    const newStyle = [style, { zIndex: data.length - index }];
                    return (
                        <View style={newStyle} index={index} {...props}>
                            {children}
                        </View>
                    );
                }}
                renderItem={useCallback(
                    ({ item, index: i }) => {
                        const inputRange = [i - 1, i, i + 1];
                        const translateX = scrollXAnimated.interpolate({
                            inputRange,
                            outputRange: [40, 0, -80],
                        });
                        const scale = scrollXAnimated.interpolate({
                            inputRange,
                            outputRange: [0.8, 1, 1.3],
                        });
                        const opacity = scrollXAnimated.interpolate({
                            inputRange,
                            outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                        });

                        return <Animated.View
                            key={`item-${i}`}
                            style={{ backgroundColor: '#effafc', position: 'absolute', borderRadius: 30, left: -ITEM_WIDTH / 2, opacity, transform: [{ translateX }, { scale }] }} >
                            <View style={{ position: 'relative' }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('userinfo', { user: item })}>
                                    <Image source={{ uri: item.poster }} style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 30 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: '15%', display: 'flex', justifyContent: 'center' }}>
                                    {/* <LinearGradient colors={['transparent', theme.COLORS.transparentBlack5]} style={{ width: '100%', height: '100%', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, }}> */}
                                    <Title name={item.title} location={item.location} distance={convertDistance(getDistance(curruntPosition, { ...item.coords }), 'km')} />
                                    {/* </LinearGradient> */}
                                </View>
                            </View>
                            <View>
                                <Actions />
                            </View>
                        </Animated.View>
                    },
                    [],
                )
                }
            />
        </View>
    )
}

export default MatchupList

const styles = StyleSheet.create({})
