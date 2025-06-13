import { COLORS, SHADOWS } from "@/config/constants";
import {
  Box,
  CircularProgress,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  easeInOut,
  motion,
  useAnimate,
  useAnimation,
  useCycle,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdChevronRight, MdQrCode } from "react-icons/md";
import { useElementSize } from "usehooks-ts";

export enum PaymentSliderAnimationState {
  slider = "slider",
  loading = "loading",
  completed = "completed",
}

interface PaymentSliderProps {
  onDragComplete: () => Promise<void>;
  initialAnimationState?: PaymentSliderAnimationState;
  qrButton: ReactNode;
}

const PaymentSlider: FunctionComponent<PaymentSliderProps> = ({
  onDragComplete,
  initialAnimationState,
  qrButton,
}) => {
  const [trackRef, trackSize] = useElementSize();
  const [thumbRef, thumbSize] = useElementSize();

  const maxDragDistance = useMemo(
    () => trackSize.width - thumbSize.width - 18,
    [trackSize.width, thumbSize.width]
  );

  const [wrapperScope, animateWrapper] = useAnimate();
  const [textScope, animateText] = useAnimate();

  const [sliderExtendedFully, setSliderExtendedFully] = useState(false);
  const [animationState, cycleAnimationState] = useCycle(
    ...Object.values(PaymentSliderAnimationState)
  );

  const dragCompleted = async () => {
    setSliderExtendedFully(false);
    cycleAnimationState();

    await onDragComplete();

    cycleAnimationState();
  };

  const animationStateCallback = useCallback(() => {
    switch (animationState) {
      case PaymentSliderAnimationState.slider:
        break;
      case PaymentSliderAnimationState.loading:
        animateWrapper(
          wrapperScope.current,
          {
            width: "60px",
            x: maxDragDistance / 2,
          },
          {
            duration: 0.3,
            ease: "easeIn",
          }
        );

        animateWrapper(
          wrapperScope.current,
          { borderRadius: "100px" },
          { delay: 0.3 }
        );
        break;
      case PaymentSliderAnimationState.completed:
        break;
    }
  }, [animateWrapper, animationState, maxDragDistance, wrapperScope]);

  useEffect(() => {
    if (!animationStateCallback) return;

    animationStateCallback();
  }, [animationState, animationStateCallback]);

  return (
    <Box w="full" ref={wrapperScope} borderRadius="16px" overflow="hidden">
      <Box
        h="60px"
        w="inherit"
        p="8px"
        bg={COLORS.grayCharcoal}
        ref={trackRef}
        pos="relative"
      >
        <motion.div
          ref={thumbRef}
          drag={"x"}
          dragElastic={0.001}
          dragConstraints={{
            left: 0,
            right: maxDragDistance,
          }}
          dragTransition={{
            bounceStiffness: 500,
          }}
          dragListener={animationState === PaymentSliderAnimationState.slider}
          dragSnapToOrigin
          onDrag={(e, info) => {
            animateText(
              textScope.current,
              {
                opacity: 1 - info.offset.x / maxDragDistance,
              },
              {
                duration: 0.01,
              }
            );

            if (info.offset.x >= maxDragDistance) {
              return setSliderExtendedFully(true);
            }
            sliderExtendedFully && setSliderExtendedFully(false);
          }}
          onDragEnd={() => {
            if (sliderExtendedFully) {
              return dragCompleted();
            }
            animateText(
              textScope.current,
              {
                opacity: 1,
              },
              {
                duration: 0.1,
              }
            );
          }}
          animate={{
            borderRadius:
              animationState === PaymentSliderAnimationState.slider
                ? "10px"
                : "100px",
          }}
          transition={{
            delay: 0.3,
          }}
          style={{
            height: "100%",
            aspectRatio: "1",
            background: COLORS.grayDark,
            boxShadow: SHADOWS.stripe,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: "1",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.2, opacity: 0 }}
              transition={{
                duration: 0.4,
              }}
              key={`payment-slider-thumb-${animationState}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(() => {
                switch (animationState) {
                  case PaymentSliderAnimationState.completed:
                    return qrButton;
                  case PaymentSliderAnimationState.loading:
                    return <Spinner />;
                  case PaymentSliderAnimationState.slider:
                    return (
                      <MdChevronRight color={COLORS.primary} size="25px" />
                    );
                }
              })()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <Text
          pos="absolute"
          className="shimmer"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="0"
          display="flex"
          gap="10px"
          whiteSpace="nowrap"
          px="150px"
          color={COLORS.textOffWhite + "88"}
          ref={textScope}
        >
          Slide to book
        </Text>
      </Box>
    </Box>
  );
};

export default PaymentSlider;
