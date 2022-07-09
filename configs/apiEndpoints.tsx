export const API_BASE_URL = "https://www.sunshinedeliver.com";
export const GOOGLE_MAP_KEY = "AIzaSyA0FkQ9pIIalmGq9adD7ATekpPEq29yvGk"

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN = getApiUrl('/login/');
export const SIGNUP = getApiUrl('/signup/');

export default {
    icCurLoc: require('../assets/images/Oval.png'),
    icGreenMarker: require("../assets/images/greenMarker.png"),
    greenIndicator: require("../assets/images/greenIndicator.png"),
    icBike: require("../assets/images/bike.png"),
}