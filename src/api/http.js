import { strings } from "@/localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function getToken() {
    return ''
}

async function getHeaders() {
    var token = await AsyncStorage.getItem(strings.prefrenceData.token);
    if (!token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": token,
        }
    }
}


async function getFormDataHeaders() {
    var token = await AsyncStorage.getItem(strings.prefrenceData.token);
    // console.log("Token::>>>", token)
    if (!token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": token,
        }
    }


}


export async function getRequest(url, params) {
    let headers = await getHeaders();
    try {
        const config = {
            method: 'GET',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response);
    }
    catch (err) {
        return getError(err);
    }
}

export async function postRequest(url, params) {
    let headers = await getHeaders();

    console.log("=====================")
    console.log("URL", url)
    console.log("params", params)
    console.log("headers", headers)
    console.log("=====================")

    try {
        const config = {
            method: 'POST',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response);
    } catch (err) {
        console.log(err)
        return getError(err)
    }
}

export async function postMultipartRequest(url, params) {
    let headers = await getFormDataHeaders();

    console.log("=====================")
    console.log("URL", url)
    console.log("params", params)
    console.log("headers", headers)
    console.log("=====================")

    try {
        const config = {
            method: 'POST',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response);
    } catch (err) {
        console.log(err)
        return getError(err)
    }
}

export async function putRequest(url, params) {
    let headers = await getHeaders();
    try {
        const config = {
            method: 'PUT',
            url: url,
            data: params,
            headers: headers,
        };

        const response = await axios(config);
        return getResponse(response);
    } catch (err) {
        return getError(err);
    }
}

const getResponse = async (response) => {
    if (response.status == 200 || response.status == 201) {
        let result = {
            status: true,
            data: response?.data ?? null,
            error: response?.data?.message ?? '',
        };
        return result;
    } else {
        let result = {
            status: false,
            data: response?.data ?? null,
            error: response?.data?.message ?? 'Something went wrong',
        };
        return result;
    }
};

const getError = (error) => {
    var message = '';
    var obj = null;
    if (error.response) {
        if (error.response.data) {
            obj = error.response.data;
            if (error.response.data.message) {
                message = error.response.data.message;
            } else {
                message = JSON.stringify(error.response.data.message);
            }
        } else {
            obj = error.response;
            message = 'Something went wrong';
        }
    } else {
        obj = error;
        message = error.message;
    }

    let data = {
        status: false,
        data: obj,
        error: message,
        status_code: error?.response?.status ?? '',
    };
    return data;
};