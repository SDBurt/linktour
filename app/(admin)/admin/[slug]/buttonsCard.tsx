import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import THEME from "@/lib/constants/theme";
import { ThemeButtonStyleTypeProps, ThemeProps } from "@/lib/types";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const options = {
  button: {
    fill: [
      { label: "None", name: "FILL" },
      { label: "Small", name: "FILL_ROUNDED" },
      { label: "Large", name: "FILL_CIRCULAR" },
    ],
    outline: [
      { label: "None", name: "OUTLINE" },
      { label: "Small", name: "OUTLINE_ROUNDED" },
      { label: "Large", name: "OUTLINE_CIRCULAR" },
    ],
    softShadow: [
      { label: "None", name: "SOFTSHADOW" },
      { label: "Small", name: "SOFTSHADOW_ROUNDED" },
      { label: "Large", name: "SOFTSHADOW_CIRCULAR" },
    ],
    hardShadow: [
      { label: "None", name: "HARDSHADOW" },
      { label: "Small", name: "HARDSHADOW_ROUNDED" },
      { label: "Large", name: "HARDSHADOW_CIRCULAR" },
    ],
    buttonColour: THEME.buttonBackgroundColor,
    buttonFontColour: THEME.buttonTextColor,
    shadowColour: THEME.buttonShadowColor,
  },
};

interface ButtonsCardProps {
  theme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
}

export function ButtonsCard({ theme, setTheme }: ButtonsCardProps) {
  const typeChangedHandler = (value: ThemeButtonStyleTypeProps) => {
    setTheme({ ...theme, buttonType: value });
  };

  const backgroundColorChangedHandler = (value: string) => {
    setTheme({ ...theme, buttonBackgroundColor: value });
  };

  const textColorChangedHandler = (value: string) => {
    setTheme({ ...theme, buttonTextColor: value });
  };

  const shadowColorChangedHandler = (value: string) => {
    setTheme({ ...theme, buttonShadowColor: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <Label>Type</Label>
          <RadioGroup
            defaultValue={theme.buttonType}
            orientation="vertical"
            value={theme.buttonType}
            onValueChange={typeChangedHandler}
          >
            <Label>Fill</Label>
            {options.button.fill.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
            <Label>Outline</Label>
            {options.button.outline.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
            <Label>Soft Shadow</Label>
            {options.button.softShadow.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
            <Label>Hard Shadow</Label>
            {options.button.hardShadow.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <Label>Button Colour</Label>
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: theme.typefaceColor }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={theme.typefaceColor}
                  onChange={backgroundColorChangedHandler}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={theme.typefaceColor}
              onChange={(e) => backgroundColorChangedHandler(e.target.value)}
            />
          </div>

          <Label>Font Colour</Label>
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: theme.typefaceColor }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={theme.typefaceColor}
                  onChange={textColorChangedHandler}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={theme.typefaceColor}
              onChange={(e) => textColorChangedHandler(e.target.value)}
            />
          </div>

          <Label>Shadow Colour</Label>
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: theme.buttonShadowColor }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={theme.buttonShadowColor}
                  onChange={shadowColorChangedHandler}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={theme.buttonShadowColor}
              onChange={(e) => shadowColorChangedHandler(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
