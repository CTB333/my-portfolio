import { useSnack } from "./useSnack";

export const useSuccessSnack = () => {
  const [successSnack] = useSnack();
  const onSuccess = (
    value: string = "",
    showSnack = true,
    returnVal = false,
  ) => {
    if (showSnack && value.length !== 0) successSnack(value);
    return returnVal;
  };
  return onSuccess;
};
