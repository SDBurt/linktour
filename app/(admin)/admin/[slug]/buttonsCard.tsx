"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const options = {
  button: {
    fill: [
      { label: "None", name: "fill-none" },
      { label: "Small", name: "fill-small" },
      { label: "Large", name: "fill-large" },
    ],
    outline: [
      { label: "None", name: "outline-none" },
      { label: "Small", name: "outline-small" },
      { label: "Large", name: "outline-large" },
    ],
    softShadow: [
      { label: "None", name: "softShadow-none" },
      { label: "Small", name: "softShadow-small" },
      { label: "Large", name: "softShadow-large" },
    ],
    hardShadow: [
      { label: "None", name: "hardShadow-none" },
      { label: "Small", name: "hardShadow-small" },
      { label: "Large", name: "hardShadow-large" },
    ],
    buttonColour: "#02A291",
    buttonFontColour: "#02A291",
    shadowColour: "#02A291",
  },
};

export function ButtonsCard() {
  const [type, setType] = useState("fill-none");
  const [buttonColour, setButtonColour] = useState("#02a291");
  const [buttonFontColour, setButtonFontColour] = useState("#02a291");
  const [shadowColour, setShadowColour] = useState("#02a291");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <Label>Type</Label>
          <RadioGroup
            defaultValue={type}
            orientation="vertical"
            value={type}
            onValueChange={setType}
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
                  style={{ backgroundColor: buttonColour }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={buttonColour}
                  onChange={setButtonColour}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={buttonColour}
              onChange={(e) => setButtonColour(e.target.value)}
            />
          </div>

          <Label>Font Colour</Label>
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: buttonFontColour }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={buttonFontColour}
                  onChange={setButtonFontColour}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={buttonFontColour}
              onChange={(e) => setButtonFontColour(e.target.value)}
            />
          </div>

          <Label>Shadow Colour</Label>
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: shadowColour }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={shadowColour}
                  onChange={setShadowColour}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={shadowColour}
              onChange={(e) => setShadowColour(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
