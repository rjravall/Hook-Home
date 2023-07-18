import { strings } from "@/localization"
import AsyncStorage from "@react-native-async-storage/async-storage"

export async function setFName(data) {
    await AsyncStorage.setItem(strings.prefrenceData.fName, data)
}
export async function setLName(data) {
    await AsyncStorage.setItem(strings.prefrenceData.lName, data)
}
export async function setPrefreName(data) {
    await AsyncStorage.setItem(strings.prefrenceData.prefreName, data)
}
export async function setDOB(data) {
    await AsyncStorage.setItem(strings.prefrenceData.DOB, data)
}
export async function setHeightvalue(data) {
    await AsyncStorage.setItem(strings.prefrenceData.height, data)
}
export async function setWeightvalue(data) {
    await AsyncStorage.setItem(strings.prefrenceData.weight, data)
}
export async function setToken(data) {
    await AsyncStorage.setItem(strings.prefrenceData.token, data)
}
export async function setUserEmail(data) {
    await AsyncStorage.setItem(strings.prefrenceData.userEmail, data)
}
export async function setUserPassword(data) {
    await AsyncStorage.setItem(strings.prefrenceData.userPassword, data)
}