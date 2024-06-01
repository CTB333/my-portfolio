import { BaseButtonClass, ButtonContainerProps } from "./types";

type SolidButtonProps = ButtonContainerProps & {};

export const SolidButton = ({
  disabled,
  onPress,
  children,
  color,
  className,
}: SolidButtonProps) => {
  return (
    <div
      onClick={disabled ? undefined : onPress}
      className={BaseButtonClass + className}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
};
