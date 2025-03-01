import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import type { ProgressBarFilledProps } from './types';
import { indeterminateAnimation, pulseAnimation } from './progressBarTokens';
import Box from '~components/Box';
import { castWebType, getIn, makeMotionTime } from '~utils';

const pulseKeyframes = keyframes`
  0% {
    opacity: ${pulseAnimation.opacityInitial};
  }
  50% {
    opacity: ${pulseAnimation.opacityMid};
  }
  100% {
    opacity: ${pulseAnimation.opacityFinal};
  }
`;

const slideAndScaleKeyframes = keyframes`
  0% {
    left: ${indeterminateAnimation.leftInitial};
    transform: scaleX(${indeterminateAnimation.scaleXInitial});
  }
  50% {
    left: ${indeterminateAnimation.leftMid};
    transform: scaleX(${indeterminateAnimation.scaleXMid});
  }
  100% {
    left: ${indeterminateAnimation.leftFinal};
    transform:  scaleX(${indeterminateAnimation.scaleXFinal});
  }
`;

const getPulseAnimationStyles = ({
  duration,
  easing,
  delay,
}: {
  duration: string;
  easing: string;
  delay: string;
}): FlattenSimpleInterpolation => css`
  height: 100%;
  width: 100%;
  opacity: ${pulseAnimation.opacityInitial};
  background-color: ${pulseAnimation.backgroundColor};
  animation: ${pulseKeyframes} ${duration} ${easing} infinite;
  animation-delay: ${delay};
`;

const BoxWithIndeterminateAnimation = styled(Box)<
  Pick<ProgressBarFilledProps, 'fillMotionDuration' | 'indeterminateMotionDuration'>
>(({ theme, indeterminateMotionDuration }) => {
  const duration = castWebType(makeMotionTime(getIn(theme.motion, indeterminateMotionDuration)));
  const easing = 'linear'; // TODO: Add this in motion tokens

  return css`
    animation: ${slideAndScaleKeyframes} ${duration} ${easing} infinite;
    position: absolute;
    width: ${indeterminateAnimation.fillWidth};
    height: 100%;
  `;
});

const IndeterminateFilledContainer = styled(BoxWithIndeterminateAnimation)<
  Pick<ProgressBarFilledProps, 'backgroundColor' | 'progress'>
>(({ backgroundColor }) => ({
  backgroundColor,
}));

const IndeterminatePulseAnimation = styled(BoxWithIndeterminateAnimation)<
  Pick<
    ProgressBarFilledProps,
    'pulseMotionDuration' | 'pulseMotionDelay' | 'motionEasing' | 'variant'
  >
>(({ theme, pulseMotionDuration, pulseMotionDelay, motionEasing, variant }) => {
  const duration = castWebType(makeMotionTime(getIn(theme.motion, pulseMotionDuration)));
  const easing = castWebType(getIn(theme.motion, motionEasing));
  const delay = castWebType(makeMotionTime(getIn(theme.motion, pulseMotionDelay)));

  return variant === 'progress' ? getPulseAnimationStyles({ duration, easing, delay }) : '';
});

const BoxWithProgressFillTransition = styled(Box)<
  Pick<ProgressBarFilledProps, 'fillMotionDuration' | 'motionEasing'>
>(({ theme, fillMotionDuration, motionEasing }) => ({
  transitionProperty: 'width',
  transitionDuration: castWebType(makeMotionTime(getIn(theme.motion, fillMotionDuration))),
  transitionTimingFunction: castWebType(getIn(theme.motion, motionEasing)),
}));

const DeterminateFilledContainer = styled(BoxWithProgressFillTransition)<
  Pick<ProgressBarFilledProps, 'backgroundColor' | 'progress' | 'indeterminateMotionDuration'>
>(({ backgroundColor, progress }) => ({
  backgroundColor,
  height: '100%',
  width: `${progress}%`,
}));

const DeterminatePulseAnimation = styled(BoxWithProgressFillTransition)<
  Pick<
    ProgressBarFilledProps,
    'pulseMotionDuration' | 'pulseMotionDelay' | 'motionEasing' | 'variant'
  >
>(({ theme, pulseMotionDuration, pulseMotionDelay, motionEasing, variant }) => {
  const duration = castWebType(makeMotionTime(getIn(theme.motion, pulseMotionDuration)));
  const easing = castWebType(getIn(theme.motion, motionEasing));
  const delay = castWebType(makeMotionTime(getIn(theme.motion, pulseMotionDelay)));

  return variant === 'progress' ? getPulseAnimationStyles({ duration, easing, delay }) : '';
});

const ProgressBarFilled = ({
  backgroundColor,
  fillMotionDuration,
  motionEasing,
  progress,
  pulseMotionDelay,
  pulseMotionDuration,
  indeterminateMotionDuration,
  variant,
  isIndeterminate,
}: ProgressBarFilledProps): React.ReactElement => {
  const ProgressBarFilledContainer = isIndeterminate
    ? IndeterminateFilledContainer
    : DeterminateFilledContainer;
  const ProgressBarPulseAnimation = isIndeterminate
    ? IndeterminatePulseAnimation
    : DeterminatePulseAnimation;

  return (
    <ProgressBarFilledContainer
      backgroundColor={backgroundColor}
      fillMotionDuration={fillMotionDuration}
      progress={progress}
      indeterminateMotionDuration={indeterminateMotionDuration}
    >
      <ProgressBarPulseAnimation
        fillMotionDuration={fillMotionDuration}
        motionEasing={motionEasing}
        variant={variant}
        pulseMotionDelay={pulseMotionDelay}
        pulseMotionDuration={pulseMotionDuration}
      />
    </ProgressBarFilledContainer>
  );
};

export { ProgressBarFilled };
