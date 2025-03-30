"use client";

import {
  Button,
  Flex,
  Heading,
  Text,
  useNumberFormatter,
  View,
} from "@adobe/react-spectrum";
import { useRef, useState } from "react";

import { useCamera } from "../hooks/use-camera";
import { useMobilenetModel } from "../hooks/use-mobilenet-model.hook";
import { Prediction } from "../utils/predictions";

const ClassificationPage = () => {
  const isInference = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRunningInference, setIsRunningInference] = useState(false);
  const [prediction, setPrediction] = useState<null | Prediction>(null);

  const video = useCamera();
  const { isLoading: isLoadingModel, model } = useMobilenetModel();

  const formatter = useNumberFormatter({
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const onGetPredictions = async () => {
    console.log("isInference.current", isInference.current);
    if (model === null || !video.current || isInference.current === false) {
      return;
    }
    const [prediction] = await model.classify(video.current);

    if (prediction !== null) {
      setPrediction(prediction);
    }
    setIsRunningInference(false);
    requestAnimationFrame(() => onGetPredictions());
  };

  const onPlay = () => {
    isInference.current = true;
    setIsPlaying(true);
    onGetPredictions();
  };

  const onPause = () => {
    isInference.current = false;
    setIsPlaying(false);
    onGetPredictions();
  };

  return (
    <View height={"100vh"} paddingTop={"size-1200"}>
      <Flex
        gap={"size-100"}
        marginX={"auto"}
        direction={"column"}
        maxWidth={{ base: "90%", L: "80%" }}
      >
        <Heading
          level={2}
          width={"100%"}
          UNSAFE_style={{ textAlign: "center" }}
        >
          Classification - camera
        </Heading>

        <Flex width={"100%"} gap={"size-100"} alignItems={"center"}>
          <Button
            variant="primary"
            onPress={isPlaying ? onPause : onPlay}
            isPending={isLoadingModel || isRunningInference}
            isDisabled={isRunningInference}
          >
            {isPlaying ? "stop" : "start"}
          </Button>

          {prediction !== null && (
            <Text marginStart={"auto"}>
              {prediction.className} -{" "}
              {formatter.format(prediction.probability)}
            </Text>
          )}
        </Flex>

        <video ref={video}></video>
      </Flex>
    </View>
  );
};

export default ClassificationPage;
