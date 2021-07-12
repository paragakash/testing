import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, ScrollView, StatusBar, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import RadialGradient from 'react-native-radial-gradient';
import theme from './constants/theme'
import { BoxShadow } from 'react-native-shadow'
import { Neomorph, Shadow } from 'react-native-neomorph-shadows';

const { width, height } = Dimensions.get('screen')

const shadowOpt = {
    width: 350,
    height: 95,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.1,
    x: 0,
    y: 0,
    style: { marginVertical: 5 }
}


const Userinfo = ({navigation,route}) => {


    console.log('paras',route.params)

    const userData=route.params.user;

    const renderHeader = () => {
        
        return userData && <View style={{ height: height > 700 ? '45%' : '40%' }} >
            <ImageBackground source={{uri:userData.poster}} style={{ flex: 1 }} resizeMode={'cover'} >
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#fff', margin: 50 }}>Back</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <LinearGradient locations={[0, 1, 1]} colors={['transparent', 'white', 'white']} style={{ height: '55%', justifyContent: 'flex-end' }} >
                        <LinearGradient locations={[0, 1, 1]} colors={['transparent', 'white', 'white']} style={{ height: '55%', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 10, paddingBottom: 5 }} >
                            {/* <Image source={require('./assets/img6.jpg')} resizeMode={'cover'} style={{ width: 120, height: 120, borderRadius: 100 }} /> */}
                            <View style={{ display: 'flex', alignItems: 'center' }}>
                                <Text style={theme.FONTS.largeTitle}>{userData.title}</Text>
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar translucent backgroundColor='transparent' />
                {renderHeader()}


                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'grey' }}>Mumbai, India </Text>
                </View>

                <View style={{ padding: 15 }}>
                    <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 20, paddingTop: 5, paddingBottom: 20 }}>
                        <RadialGradient radius={250} stops={[0, 0.6]} colors={[theme.COLORS.transparentBlack1, theme.COLORS.transparent]} style={{ padding: 3 }}  >
                            {/* <BoxShadow setting={shadowOpt}> */}
                            <View style={{ flexDirection: 'row', borderWidth: 0, padding: 10, backgroundColor: '#fff', borderRadius: 5 }} >
                                <View style={{ flexDirection: 'column', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}>
                                    <Text style={theme.FONTS.h2}>28</Text>
                                    <Text style={{ color: theme.COLORS.gray, marginTop: 5 }}>Age</Text>
                                </View>
                                <View style={{ borderLeftWidth: 0.3, borderLeftColor: 'lightgrey', flexDirection: 'column', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}>
                                    <Text style={theme.FONTS.h2}>S</Text>
                                    <Text style={{ color: theme.COLORS.gray, marginTop: 5 }}>Status</Text>
                                </View>
                                <View style={{ borderLeftWidth: 0.3, borderLeftColor: 'lightgrey', flexDirection: 'column', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center' }}>
                                    <Text style={theme.FONTS.h2}>73%</Text>
                                    <Text style={{ color: theme.COLORS.gray, marginTop: 5 }}>Matches</Text>
                                </View>
                            </View>
                            {/* </BoxShadow> */}

                        </RadialGradient>
                    </View>

                    <Text style={theme.FONTS.h3}>About</Text>
                    <View>
                        <Text style={[theme.FONTS.body3, { color: theme.COLORS.gray }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </Text>
                    </View>
                    <Text style={[theme.FONTS.h3, { marginVertical: 15 }]}>Album</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image source={require('./assets/img4.jpg')} style={[{ width: 100, height: 100, borderRadius: 5, marginRight: 5 }]} resizeMode={'cover'} />
                        <Image source={require('./assets/img5.jpg')} style={[{ width: 100, height: 100, borderRadius: 5, marginHorizontal: 5 }]} resizeMode={'cover'} />
                        <Image source={require('./assets/img6.jpg')} style={[{ width: 100, height: 100, borderRadius: 5, marginHorizontal: 5 }]} resizeMode={'cover'} />
                        <View style={[{ width: 100, height: 100, borderRadius: 5, marginHorizontal: 5, backgroundColor: 'lightblue' }]}>
                        </View>
                    </View>
                    {/* <Shadow
                            style={{
                                borderRadius: 10,
                                shadowOpacity: 0.1,
                                shadowColor: 'black',
                                shadowRadius: 10,
                                backgroundColor: '#fff',
                                width: 300,
                                height: 80,
                                margin: 20
                            }}
                        /> */}

                </View>
            </View>
        </View>
    )
}

export default Userinfo

const styles = StyleSheet.create({})
