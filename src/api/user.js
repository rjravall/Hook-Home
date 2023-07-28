//REQUEST
import { getRequest, postMultipartRequest, postRequest, putRequest } from "./http";

//CONSTANT
import { WEB_SERVICE } from "@/constants/WebService";


async function loginUser(params) {
    let url = WEB_SERVICE.login
    const result = await postRequest(url, params)
    return result
}

async function sendOtp(params) {
    let url = WEB_SERVICE.sendOtp
    const result = await postRequest(url, params)
    return result
}

async function signUp(params) {
    let url = WEB_SERVICE.signUp
    const result = await postRequest(url, params)
    return result
}

async function getModes(params) {
    let url = WEB_SERVICE.getModes
    const result = await getRequest(url, params)
    return result
}

async function getEthnicity(params) {
    let url = WEB_SERVICE.ethnicity
    const result = await getRequest(url, params)
    return result
}

async function getReligions(params) {
    let url = WEB_SERVICE.religions
    const result = await getRequest(url, params)
    return result
}

async function getPoliticalBeliefs(params) {
    let url = WEB_SERVICE.political_beliefs
    const result = await getRequest(url, params)
    return result
}

async function getRelationshipStatus(params) {
    let url = WEB_SERVICE.relationship_status
    const result = await getRequest(url, params)
    return result
}

async function getGenderIdentity(params) {
    let url = WEB_SERVICE.gender_identity
    const result = await getRequest(url, params)
    return result
}

async function getBodytypes(params) {
    let url = WEB_SERVICE.body_types
    const result = await getRequest(url, params)
    return result
}

async function getSexualOrientation(params) {
    let url = WEB_SERVICE.sexual_orientation
    const result = await getRequest(url, params)
    return result
}

async function getSexualPreference(params) {
    let url = WEB_SERVICE.sexual_preference
    const result = await getRequest(url, params)
    return result
}

async function getInterests(params) {
    let url = WEB_SERVICE.interests
    const result = await getRequest(url, params)
    return result
}

async function getKinks(params) {
    let url = WEB_SERVICE.kinks
    const result = await getRequest(url, params)
    return result
}

async function getDrinks(params) {
    let url = WEB_SERVICE.drinks
    const result = await getRequest(url, params)
    return result
}

async function getExercise(params) {
    let url = WEB_SERVICE.exercise
    const result = await getRequest(url, params)
    return result
}

async function getMarijuana(params) {
    let url = WEB_SERVICE.marijuana
    const result = await getRequest(url, params)
    return result
}

async function getSmoke(params) {
    let url = WEB_SERVICE.smoke
    const result = await getRequest(url, params)
    return result
}

async function getPets(params) {
    let url = WEB_SERVICE.pets
    const result = await getRequest(url, params)
    return result
}

async function getLanguage(params) {
    let url = WEB_SERVICE.language
    const result = await getRequest(url, params)
    return result
}

async function getzodiacSign(params) {
    let url = WEB_SERVICE.zodiac_sign
    const result = await getRequest(url, params)
    return result
}

async function getTribes(params) {
    let url = WEB_SERVICE.tribes
    const result = await getRequest(url, params)
    return result
}

async function getPersonalityType(params) {
    let url = WEB_SERVICE.personality_type
    const result = await getRequest(url, params)
    return result
}

async function postUpdateProfile(params) {
    let url = WEB_SERVICE.update_profile
    const result = await postMultipartRequest(url, params)
    return result
}

async function postChangePassword(params) {
    let url = WEB_SERVICE.changePassword
    const result = await postRequest(url, params)
    return result
}

async function getProfile(params) {
    let url = WEB_SERVICE.get_profile
    const result = await getRequest(url, params)
    return result
}

async function suggestedUser(params) {
    let url = WEB_SERVICE.suggested_user
    const result = await postRequest(url, params)
    return result
}


async function getUserProfile(params, id) {
    let url = WEB_SERVICE.user_profile + id
    console.log("HELLO URL :=========", url)
    const result = await getRequest(url, params)
    return result
}
async function getUserDetais(params) {
    let url = WEB_SERVICE.user_detais
    const result = await getRequest(url, params)
    return result
}
async function getSwipeUser(params) {
    let url = WEB_SERVICE.user_swipe
    const result = await postRequest(url, params)
    return result
}
async function getMatchUser(params) {
    let url = WEB_SERVICE.match_user
    const result = await postRequest(url, params)
    return result
}




export {
    getSwipeUser,
    signUp,
    sendOtp,
    loginUser,
    getModes,
    getEthnicity,
    getReligions,
    getPoliticalBeliefs,
    getRelationshipStatus,
    getGenderIdentity,
    getBodytypes,
    getSexualOrientation,
    getSexualPreference,
    getInterests,
    getKinks,
    getDrinks,
    getExercise,
    getMarijuana,
    getSmoke,
    getPets,
    getLanguage,
    getzodiacSign,
    getTribes,
    getPersonalityType,
    postUpdateProfile,
    postChangePassword,
    getProfile,
    suggestedUser,
    getUserProfile,
    getUserDetais,
    getMatchUser

}