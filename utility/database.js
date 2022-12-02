import axios from 'axios';

const BASE_URL = 'https://www.omslocation.com/demos/api/';

let axiosApiClient;
const axiosConfig = {
  baseURL: BASE_URL,
  validateStatus: () => true,
};
axiosApiClient = axios.create(axiosConfig);

export const checkregister = async params => {
  try {
    const getResponse = await axiosApiClient.post(`signup`, params);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong', status: false};
  }
};

export const checkLogin = async params => {
  try {
    const getResponse = await axiosApiClient.post(`login`, params);
    // console.log('getResponse', getResponse);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const home = async params => {
  try {
    const getResponse = await axiosApiClient.get(`index`, params);
    // console.log('dashboard', getResponse);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const Property = async params => {
  try {
    const getResponse = await axiosApiClient.get(`properties`, params);
    // console.log('dashboard', typeof getResponse.data);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const MyProperties = async id => {
  try {
    const getResponse = await axiosApiClient.get(`properties?user_id=${id}`);
    // console.log('dashboard', getResponse.data);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const UpdateProperty = async (id, params) => {
  try {
    axiosApiClient.defaults.headers.post['Content-Type'] =
      'multipart/form-data';
    axiosApiClient.defaults.headers.post['Accept'] = 'application/json';
    const getResponse = await axiosApiClient.post(
      `update-property/${id}`,
      params,
    );
    // console.log('dashboard', getResponse.data);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const PropertyDeatil = async id => {
  try {
    const getResponse = await axiosApiClient.get(`properties/409`);
    // console.log(getResponse);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};

export const WishList = async id => {
  try {
    const getResponse = await axiosApiClient.get(`wishlist/${id}`);
    // console.log(getResponse);
    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};

export const AddFav = async params => {
  try {
    const getResponse = await axiosApiClient.post(`add-to-wishlist`, params);
    // console.log(getResponse.data);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const BookRecee = async params => {
  try {
    const getResponse = await axiosApiClient.post(`book-recee`, params);
    // console.log(getResponse.data);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const webrowser = async params => {
  try {
    const getResponse = await axiosApiClient.post(`add-property`, params);
    console.log(getResponse.data);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const CountryList = async () => {
  try {
    const getResponse = await axiosApiClient.get(`countries`);
    // console.log(getResponse.data.data[7].name);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const CityList = async () => {
  try {
    const getResponse = await axiosApiClient.get(`cities`);
    // console.log(getResponse.data.data[7].name);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const StateList = async () => {
  try {
    const getResponse = await axiosApiClient.get(`states`);
    // console.log(getResponse.data.data[7].name);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const Aminities = async () => {
  try {
    const getResponse = await axiosApiClient.get(`amenities`);
    // console.log(getResponse.data.data[7].name);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const Features = async () => {
  try {
    const getResponse = await axiosApiClient.get(`features`);
    // console.log(getResponse.data.data[7].name);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const Categories = async () => {
  try {
    const getResponse = await axiosApiClient.get(`categories`);
    // console.log(getResponse.data.data[7].name);

    return getResponse.data;
  } catch (err) {
    return {message: 'something went wrong source down', status: false};
  }
};
export const AddProperty = async params => {
  try {
    axiosApiClient.defaults.headers.post['Content-Type'] =
      'multipart/form-data';
    const getResponse = await axiosApiClient.post(`add-property`, params);
    return getResponse.data;
  } catch (err) {
    console.log(err);
    return {message: 'something went wrong source down', status: false};
  }
};
// console.log(axiosApiClient.defaults.headers.post);
