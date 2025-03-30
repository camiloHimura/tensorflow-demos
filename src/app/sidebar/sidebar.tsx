import { Heading, Item, ListView } from "@adobe/react-spectrum";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <>
      <Heading level={2}>Tensorflow Models</Heading>
      <ListView marginTop={"size-100"} aria-label="Main Navigation">
        <Item>
          <Link href="/classification">Classification</Link>
        </Item>
        <Item>
          <Link href="/segmentation">Segmentation</Link>
        </Item>
        <Item>
          <Link href="/human-pose">Human Pose</Link>
        </Item>
      </ListView>
    </>
  );
};
