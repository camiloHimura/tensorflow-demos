import { getVideoUserMedia } from "./navigator";

export enum UserCameraPermission {
  GRANTED = "granted",
  DENIED = "denied",
  ERRORED = "errored",
  PENDING = "pending",
}

// For now we only care about these two. For the complete list please check
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
export enum UserCameraPermissionError {
  NOT_ALLOWED = "NotAllowedError",
  NOT_FOUND = "NotFoundError",
}

export const getPermissionError = (error: unknown) => {
  const errorType = error instanceof Error ? error.message : "";

  return errorType === UserCameraPermissionError.NOT_ALLOWED
    ? UserCameraPermission.DENIED
    : UserCameraPermission.ERRORED;
};

export const getBrowserPermissions = async () => {
  try {
    const stream = await getVideoUserMedia();
    return { permissions: UserCameraPermission.GRANTED, stream };
  } catch (error: unknown) {
    return { permissions: getPermissionError(error), stream: null };
  }
};
