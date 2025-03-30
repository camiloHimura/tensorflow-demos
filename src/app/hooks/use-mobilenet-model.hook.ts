"use client";
import { ToastQueue } from "@adobe/react-spectrum";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

export const useMobilenetModel = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("tf.version.tfj;", tf.version);

    mobilenet
      .load()
      .then((newModel) => {
        setModel(newModel);
        ToastQueue.neutral("Mobilenet model is loaded");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { model, isLoading };
};
