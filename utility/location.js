import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Google_Api_Key = 'AIzaSyAF4fZmtr0PdUrxqIJklVPUCYiTMprsMno';

export function GetMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat}${lng}&zoom=15&markers=${lat},${lng}|${lat},${lng}&path=color:blue|weight:10|${lat},${lng}&size=450x350&key=${Google_Api_Key}`;
  // console.log(imagePreviewUrl);
  return imagePreviewUrl;
}

export function LocationPermission() {
  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => res);

  check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function CameraPermission() {
  request(PERMISSIONS.ANDROID.CAMERA).then(res => res);

  check(PERMISSIONS.ANDROID.CAMERA)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
      }
    })
    .catch(error => {
      console.log(error);
    });
  return;
}
