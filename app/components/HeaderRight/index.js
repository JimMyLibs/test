import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

class HeaderRight extends React.Component {
	render() {
		const hr_menu = ['菜单一','菜单二','菜单三','菜单四']
		return (
			<View style={styles.cmpt_hr}>
				<TouchableOpacity style={styles.hr_btn} onPress={() => alert('This is a button!')}>
					<Text>• • •</Text>
				</TouchableOpacity>
				<View style={styles.hr_modal}>
					<View style={styles.modal_list}>
						{
							hr_menu.map((item)=>
								<Text style={styles.modal_text}>{item}</Text>
							)
						}
					</View>
					<View style={styles.modal_trangle}></View>
					<View style={styles.modal_mask}></View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    cmpt_hr: {
    	position:'relative',
    },
    hr_btn: {
		fontWeight: 'bold',
		width: 50,
		textAlign: 'center',
    },
    hr_modal:{

    },
    modal_list:{
    	position:'absolute',
	    top: 44,
	    right: 10,
	    width: 150,
	    backgroundColor: '#4a4a4a',
		borderRadius: 6,
		padding: 2,
    },
    modal_text:{
    	fontSize: 20,
    	color: '#fff',
		textAlign: 'center',
		padding: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#5a5a5a',
    },
    modal_trangle:{
    	position:'absolute',
	    top: 30,
	    right: 40,
		width: 0,
		height: 0,
		borderTopWidth: 8,
		borderTopColor: 'transparent',
		borderRightWidth: 10,
		borderRightColor: 'transparent',
		borderLeftWidth: 10,
		borderLeftColor: 'transparent',
		borderBottomWidth: 8,
		borderBottomColor: '#4a4a4a',
    },
    modal_mask:{

    },
});

export default HeaderRight