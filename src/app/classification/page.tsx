"use client";

import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  useNumberFormatter,
  View,
  Well,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { useIsSSR } from "react-aria";
import { useMobilenetModel } from "./use-mobilenet-model.hook";
import { loadImage, Prediction } from "./utils";

const ClassificationPage = () => {
  const [url, setUrl] = useState("");
  const [img, setImg] = useState<null | HTMLImageElement>(null);
  const [isRunningInference, setIsRunningInference] = useState(false);
  const [prediction, setPrediction] = useState<null | Prediction>(null);

  const { isLoading: isLoadingModel, model } = useMobilenetModel();

  const formatter = useNumberFormatter({
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const onGetPredictions = async () => {
    if (model === null || img === null) {
      return;
    }
    setIsRunningInference(true);

    const newImage = await loadImage(img.src);
    const [prediction] = await model.classify(newImage);
    console.log("prediction", prediction);

    if (prediction !== null) {
      setPrediction(prediction);
    }
    setIsRunningInference(false);
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
          Classification {useIsSSR() ? "Server" : "Client"}
        </Heading>

        <Text>Page a image url from staticflickr, for instance</Text>
        <Well>
          https://live.staticflickr.com/7544/26280888754_1acb5bdb73_b.jpg
        </Well>

        <Divider marginY={"size-200"} />

        <Flex width={"100%"} gap={"size-100"} alignItems={"center"}>
          <TextField
            contextualHelp="url"
            value={url}
            onChange={(newValue) => {
              setUrl(newValue);
              setPrediction(null);
            }}
          />

          <Button
            variant="primary"
            onPress={onGetPredictions}
            isPending={isLoadingModel || isRunningInference}
            isDisabled={url === "" || isRunningInference}
          >
            Get predictions
          </Button>

          {prediction !== null && (
            <Text marginStart={"auto"}>
              {prediction.className} -{" "}
              {formatter.format(prediction.probability)}
            </Text>
          )}
        </Flex>

        {url !== "" && (
          <Image
            alt="sample image"
            src={url}
            onLoad={({ target }) => {
              console.log("data", target as HTMLImageElement);
              setImg(target as HTMLImageElement);
            }}
          />
        )}
      </Flex>
    </View>
  );
};

export default ClassificationPage;
