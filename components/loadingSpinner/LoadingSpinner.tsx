"use client";

import { BarLoader, FadeLoader } from "react-spinners";

type Props = {
  type?: Type;
};
type Type = "data" | "page";

const LoadingSpinner = ({ type = "page" }: Props) => {
  return type === "page" ? (
    <FadeLoader color="salmon" />
  ) : (
    <BarLoader color="salmon" />
  );
};

export default LoadingSpinner;
