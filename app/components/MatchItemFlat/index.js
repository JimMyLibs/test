import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


class MatchItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <View style={styles.page}>
                <View><Text>{this.props.id}-{this.props.data.date}</Text></View>
                {
                    this.props.data.coupons.map((couponsItem,couponsIndex)=>{
                        return (
                            <TouchableOpacity style={styles.coupon} onPress={this._onPress} key={this.props.id+'-'+couponsIndex}>
                                <View style={styles.coupon_title}>
                                    <Text style={[styles.coupon_league,styles.color_white]}>{this.props.id}-{couponsIndex}-{couponsItem.league}</Text>
                                    <View style={styles.coupon_oddsNames}>
                                        {
                                            couponsItem.oddsNames.map((oddItem,oddIndex)=>{
                                                return (
                                                    <Text style={styles.color_white} key={this.props.id+'-'+couponsIndex+'-'+oddIndex}>{oddItem}</Text>
                                                )
                                            })
                                        }
                                        <View style={styles.coupon_oddsNamesRight}></View>                
                                    </View>
                                </View>
                                {
                                    couponsItem.matches.map((matchItem,matchIndex)=>{
                                        return (
                                            <View style={styles.matches} key={this.props.id+'-'+couponsIndex+'-'+matchIndex}>
                                                <View style={styles.matches_team}>
                                                    <Text>{matchItem.home}</Text>
                                                    <Text>{matchItem.away}</Text>
                                                    <Text style={styles.matches_dateTime}>{matchItem.matchDateTime}</Text>
                                                </View>
                                                <View style={styles.matches_oddsSet}>
                                                    {
                                                        matchItem.oddsSet.map((setItem,setIndex)=>{
                                                            return (
                                                                <View style={styles.matches_oddsInfo} key={this.props.id+'-'+couponsIndex+'-'+matchIndex+'-'+setIndex}>
                                                                    {
                                                                        setItem.oddsInfo.map((oddItem,oddIndex)=>{
                                                                            return (
                                                                                <TouchableOpacity key={this.props.id+'-'+couponsIndex+'-'+matchIndex+'-'+setIndex+'-'+oddIndex}>
                                                                                    <Text style={styles.matches_odds}>{oddItem.odds}</Text>
                                                                                </TouchableOpacity>
                                                                            )
                                                                        })
                                                                    }
                                                                    <TouchableOpacity>
                                                                        <Text style={[styles.matches_odds,styles.matches_oddsBtn]}>|||</Text>
                                                                    </TouchableOpacity>
                                                                </View>                                                                 
                                                            )
                                                        })
                                                    }
                                                </View>                                        
                                            </View>
                                        )
                                    })
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // common style
    color_white:{
        color: '#fff',
    },
    // page style
    page: {

    },
    coupon:{

    },
    coupon_title:{
        paddingLeft: 10,
        paddingRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#505050',
    },
    coupon_league:{
        flex: 0.5,
    },
    coupon_oddsNames:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    coupon_oddsNamesRight:{// block for style
        width: 0,         
    },
    matches:{
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 5,
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    matches_team:{
        flex: 0.5,
    },
    matches_dateTime:{ 
        width: 100,       
        paddingLeft:10,
        backgroundColor: '#eee',  
        borderTopRightRadius: 100,
    },
    matches_oddsSet:{
        flex: 0.5,
    },
    matches_oddsInfo:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    matches_odds:{
        width: 44,
        height: 48,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#D6F7E7',
    },
    matches_oddsBtn:{
        width: 30,
        color: '#D6F7E7',
        fontWeight: 'bold',
        backgroundColor: '#ddd',        
    }
});

export default MatchItem