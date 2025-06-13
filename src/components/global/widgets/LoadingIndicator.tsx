import { CircularProgress } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface LoadingIndicatorProps {
  [x: string]: any;
}

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
  ...props
}) => {
  return <CircularProgress {...props} />;
};

export default LoadingIndicator;
