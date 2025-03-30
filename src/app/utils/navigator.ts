export const isVideoInput = (mediaDevice: MediaDeviceInfo) =>
  mediaDevice.kind === "videoinput";

export const getVideoUserMedia = () =>
  navigator.mediaDevices.getUserMedia({ video: true });

/* export const getVideoDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  const videoDevices = devices.filter(isVideoInput);

  return uniqBy(videoDevices, (device) => device.deviceId);
};
 */
