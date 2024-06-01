import React from "react";
import { ButtonContainerProps } from "./types";
import { OutlineButton } from "./OutlineButton";
import { SolidButton } from "./SolidButton";
import { HoverGrow, ShrinkClick } from "../common_animations";
import { COLORS } from "../../constants";

type TextButtonProps = ButtonContainerProps & {
  text: string;
  buttonColor?: string;
  size?: number;
  outline?: boolean;
  bold?: boolean;
};

export const TextButton = ({
  disabled,
  text,
  outline,
  size,
  bold,
  color,
  buttonColor,
  onPress,
  className,
  children,
}: TextButtonProps) => {
  const Button = outline ? OutlineButton : SolidButton;

  return (
    <ShrinkClick clickable={!disabled} className={className}>
      <HoverGrow clickable={!disabled}>
        <Button
          disabled={disabled}
          color={disabled ? COLORS.gray : buttonColor ?? color}
          onPress={onPress}
        >
          <div className="flex row center even">
            <p
              style={{ color }}
              className={`${size ? `fs-${size}` : ""} ${
                bold ? "bold" : ""
              } color-secondary`}
            >
              {text}
            </p>
            {children}
          </div>
        </Button>
      </HoverGrow>
    </ShrinkClick>
  );
};
