//Live
// export const BASE_URL = 'http://34.207.254.140:8080'

//Local
export const BASE_URL = 'http://192.168.1.152:8080'


export const WEB_SERVICE = {
    login: BASE_URL + '/api/v1/user/login',
    sendOtp: BASE_URL + '/api/v1/user/send-otp',
    signUp: BASE_URL + '/api/v1/user/registration',
    getModes: BASE_URL + '/api/v1/preferences/get-modes',
    ethnicity: BASE_URL + '/api/v1/preferences/get-ethnicity',
    religions: BASE_URL + '/api/v1/preferences/get-religions',
    political_beliefs: BASE_URL + '/api/v1/preferences/get-political-beliefs',
    relationship_status: BASE_URL + '/api/v1/preferences/get-relationship-status',
    gender_identity: BASE_URL + '/api/v1/preferences/get-gender-identity',
    body_types: BASE_URL + '/api/v1/preferences/get-body-types',
    sexual_orientation: BASE_URL + '/api/v1/preferences/get-sexual-orientation',
    sexual_preference: BASE_URL + '/api/v1/preferences/get-Sexual-preference',
    interests: BASE_URL + '/api/v1/preferences/get-interests',
    kinks: BASE_URL + '/api/v1/preferences/get-kinks',
    drinks: BASE_URL + '/api/v1/preferences/get-drinks',
    exercise: BASE_URL + '/api/v1/preferences/get-exercise',
    marijuana: BASE_URL + '/api/v1/preferences/get-marijuana',
    smoke: BASE_URL + '/api/v1/preferences/get-smoke',
    pets: BASE_URL + '/api/v1/preferences/get-pets',
    language: BASE_URL + '/api/v1/preferences/get-language',
    zodiac_sign: BASE_URL + '/api/v1/preferences/get-zodiac-sign',
    tribes: BASE_URL + '/api/v1/preferences/get-tribes',
    personality_type: BASE_URL + '/api/v1/preferences/get-personality-type',
    update_profile: BASE_URL + '/api/v1/user/update-profile',
    changePassword: BASE_URL + '/api/v1/user/change-password',
    get_profile: BASE_URL + '/api/v1/user/details',
    set_location: BASE_URL + '/api/v1/user/update-profile',
    suggested_user: BASE_URL + '/api/v1/suggested/suggested-users',
    user_profile: BASE_URL + '/api/v1/suggested/users-profile/',
    user_detais: BASE_URL + '/api/v1/user/details',
    user_swipe: BASE_URL + '/api/v1/match/swap-user',
    match_user: BASE_URL + '/api/v1/match/get-match-users',
    send_otp: BASE_URL + '/api/v1/user/send-otp',
    setforgetpassword: BASE_URL + "/api/v1/user/forgot-password",
    passwordverifiction: BASE_URL + "/api/v1/user/verify-otp",
    get_notification: BASE_URL + "/api/v1/notification/get-notification?limit=5&skip=0"

}