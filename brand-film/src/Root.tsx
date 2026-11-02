import React from "react";
import { Composition } from "remotion";
import { Film, type FilmProps } from "./Film";
import { DURATION, FPS } from "./lib/timeline";

const defaultProps: FilmProps = { voiceover: false, sound: true };

export const Root: React.FC = () => (
  <>
    <Composition id="Vertical" component={Film} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={defaultProps} />
    <Composition id="Horizontal" component={Film} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} defaultProps={defaultProps} />
  </>
);
