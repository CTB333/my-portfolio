import { BaseButtonClass, ButtonContainerProps } from "./types";

type OutlineButtonProps = ButtonContainerProps & {};

export const OutlineButton = ({
  disabled,
  children,
  color,
  className,
  onPress,
}: OutlineButtonProps) => {
  return (
    <div
      onClick={disabled ? undefined : onPress}
      className={BaseButtonClass + className}
      style={{
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: "transparent",
        borderColor: color,
      }}
    >
      {children}
    </div>
  );
};
