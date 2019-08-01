
import { AsyncStorage } from "react-native";

global.getLanguage = async ()=>{
    const curLanguage = await AsyncStorage.getItem('language');
    return curLanguage || 'Eng';
}