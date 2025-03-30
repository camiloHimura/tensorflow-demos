import { ToastQueue } from "@adobe/react-spectrum";
import { useEffect, useRef } from "react";
import { getBrowserPermissions, UserCameraPermission } from "../utils/camera";

const hasErrors = (permissions: UserCameraPermission) => {
  return [UserCameraPermission.DENIED, UserCameraPermission.ERRORED].includes(
    permissions
  );
};

export const useCamera = () => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getBrowserPermissions()
      .then(({ permissions, stream }) => {
        if (hasErrors(permissions)) {
          ToastQueue.negative("User permissions unsuccessful");
          return;
        }

        if (video.current) {
          video.current.srcObject = stream;
          video.current.onloadedmetadata = () => video.current?.play();
        }
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [video]);

  return video;
};
