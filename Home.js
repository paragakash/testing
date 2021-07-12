import React, { useCallback, useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import {
    StatusBar,
    Image,
    FlatList,
    Dimensions,
    Animated,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Easing,
    Pressable,
} from 'react-native';
import theme from './constants/theme'
import {
    FlingGestureHandler,
    Directions,
    State,
    TouchableOpacity,
} from 'react-native-gesture-handler';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import DATA from './data'
import LinearGradient from 'react-native-linear-gradient';

import MatchupList from './MatchUpsScreen/MatchupList';
import Carousel from 'react-native-snap-carousel-chen';
import { useAnimatedReaction } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import NativeDialogManagerAndroid from 'react-native/Libraries/NativeModules/specs/NativeDialogManagerAndroid';


const { width, height } = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.8;
const VISIBLE_ITEMS = 4;

const OverflowItems = ({ data, scrollXAnimated }) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
    });
    return (
        <View style={styles.overflowContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {data.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <Pressable style={{ flex: 1 }} onPress={() => alert()}>
                                <Text style={[styles.title]} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <View style={styles.itemContainerRow}>
                                    <Text style={[styles.location]}>
                                        {item.location}
                                    </Text>
                                    <Text style={[styles.date]}>{item.date}</Text>
                                </View>
                            </Pressable>
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );
};



const Home = ({ navigation }) => {
    //console.log("navigation",navigation)
    const [data, setData] = React.useState(DATA);
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = React.useState(0);
    const [arraindex, setarraindex] = useState(0);
    const setActiveIndex = useCallback(
        (activeIndex) => {
            scrollXIndex.setValue(activeIndex);
            setIndex(activeIndex);
        },
        [],
    )



    React.useEffect(() => {
        let arr = []
        for (var i = 0; i < 10; i++) {
            arr.push(DATA[i])
        }
        setData(arr)
    }, [])

    // const resetData = () => {
    //     let arr = []
    //     var number = arraindex !== 0 ? arraindex : 0
    //     console.log()

    //     for (var i = 0; i < 10; i++) {
    //         if (i !== 0) {
    //             arr.push(data[i])
    //         }
    //     }
    //     setarraindex(number + 1)
    //     setData([...arr, DATA[number + 1] ])
    //     //if(index > 0) setActiveIndex(index - 1)
    // }

    //const [getlocationData, setgetlocationData] = useState(getLocationCoords())

    console.log(arraindex, "", data.length)

    const [previousIndex, setpreviousIndex] = useState(0)

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start();
    });

    // React.useEffect(() => {
    //     //&& index == data.length - VISIBLE_ITEMS - 3
    //     console.log([previousIndex, " ", index])
    //     if (previousIndex == data.length - 1 && index == data.length - VISIBLE_ITEMS - 3) {
    //         const newData = [...data, ...data];
    //         setData(DATA);
    //     }
    // })


    const onSwipeLeft = (gestureState) => {
        console.log("swiprd")
        //setActiveIndex(index + 1)
        setActiveIndex(index + 1)
    

        // if (index == data.length - 1) {
        //     setpreviousIndex(data.length - 1)
        //     let items = data;
        //     for (const key in items) {
        //         let item = {
        //             ...items[key],
        //             status: 0
        //         }
        //         items[key] = item
        //     }

        //     setData(items)
        //     setActiveIndex(0);

        // }
        // else {
        //     let items = data;
        //     let item = {
        //         ...data[index],
        //         status: 1
        //     }
        //     items[index] = item;
        //     setData(items)
        // }
    }

    console.log(index, " ", scrollXIndex)

    const onSwipeRight = (gestureState) => {

        // if (index === 0) {
        //   return;
        // }
        // setActiveIndex(index - 1);
    }



    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const slidererf = useRef()

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor='transparent' />
            {/* Gesture animations      */}
            <GestureRecognizer
                onSwipeLeft={(state) => onSwipeLeft(state)}
                onSwipeRight={(state) => onSwipeRight(state)}
                config={config}
                style={{
                    height: height,
                    width: width
                }}
            >
                <SafeAreaView style={styles.container}>
                    {/* <OverflowItems data={data} scrollXAnimated={scrollXAnimated} /> */}
                    <View style={{ flex: 0.08, justifyContent: 'center', paddingHorizontal: width * 0.08, paddingTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, overflow: 'hidden', padding: 3, borderWidth: 0.5, borderColor: 'lightgrey' }}>
                                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/86.jpg' }} resizeMode={'cover'} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                            </View>
                            <View>
                                <Icon name={'md-options-sharp'} size={30} />
                            </View>
                        </View>
                    </View>

                    {/* Call Flatlist */}

                    <MatchupList navigation={navigation} scrollXAnimated={scrollXAnimated} data={data} style={{ flex: 0.9 }} />

                    <View style={{ flex: 0.1, alignItems: 'center' }}>
                        {/* <View style={{ backgroundColor: '#effafc',borderWidth:0 , display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width * 0.8, height: width * 0.2, borderRadius: 10 }}>
                            <Icon name="ios-close-outline" size={40} color={'#333'} />
                            <Icon name="ios-heart-circle-outline" size={40} color={'#333'} />
                            {/* <Icon name="ios-heart-circles" size={40} color={'#333'} /> */}
                        {/* <Icon name="ios-heart-outline" size={40} color={'#333'} /> */}
                        {/* <Icon name="ios-heart" size={40} color={'#333'} /> */}
                        {/* <Icon name="chevron-forward" size={40} color={'#333'} />
                        </View> */}
                    </View>

                </SafeAreaView>
            </GestureRecognizer>
        </View>
    );
}


export default Home


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -1,
    },
    location: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
    },
    itemContainer: {
        height: OVERFLOW_HEIGHT,
        padding: SPACING * 2,
    },
    itemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overflowContainer: {
        height: OVERFLOW_HEIGHT,
        overflow: 'hidden',
    },
});