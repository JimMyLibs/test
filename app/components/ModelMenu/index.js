import React, { Component } from "react";
import { StyleSheet, Modal, Text, TouchableOpacity, View } from "react-native";

class ModelMenu extends Component {
    state = {
        modalVisible: false
    };

    setModalVisible(visible) {
        // console.warn('setModalVisible', visible)
        this.setState({ modalVisible: visible });
    }
    selectMenu(item) {
        // console.warn('selectMenu', item)
        this.props.setPool(item)
        this.setState({ modalVisible: false });
    }

    render() {
        const page_menu = ['HAD', 'TQL', 'FHA', 'HHA']
        return (
            <View style={styles.ModelMenu}>
                {/* 右上角菜单按钮 */}
                <TouchableOpacity style={styles.mm_btnbox} onPress={() => { this.setModalVisible(true) }}>
                    <Text style={styles.mm_btn}>• • •</Text>
                </TouchableOpacity>
                {/* 模态框 */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(false) }}
                >
                    <View style={styles.mm_page}>
                        <View style={styles.page_menu}>
                            <View style={styles.menu_trangle}></View>
                            <View style={styles.menu_list}>
                                {
                                    page_menu.map((item, index) =>
                                        <TouchableOpacity key={index}  onPress={() => { this.selectMenu(item) }}>
                                            <Text style={styles.menu_text}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                        <TouchableOpacity style={styles.page_mask} onPress={() => { this.setModalVisible(false) }}></TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ModelMenu: {// 本组件

    },
    mm_btnbox: {// 右上角菜单按钮
        width: 50,
        // height: '100%',
        // justifyContent: 'center',
        position: 'absolute',
        height: 20,
        backgroundColor: '#D6F7E7',
        borderColor: '#aaa',
        borderWidth: 1,
        zIndex: 9,
    },
    mm_btn: {// 右上角菜单按钮
        fontWeight: 'bold',
    },
    mm_page: {// 模态框页面
        width: '100%',
        height: '100%',
    },
    page_mask: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
    },
    page_menu: {// 下拉菜单
        position: 'absolute',
        top: 56,
        right: 8,
        width: 150,
        zIndex: 11,
    },
    menu_trangle: {// 三角形
        left: 110,
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
    menu_list: {// 菜单列表
        backgroundColor: '#4a4a4a',
        borderRadius: 6,
        padding: 2,
    },
    menu_text: {// 菜单文字
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#5a5a5a',
    },
})

export default ModelMenu