"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const options = {
  background: {
    type: [
      { label: "Flat Colour", name: "flat" },
      { label: "Gradient", name: "gradient" },
    ],
    direction: [
      { label: "Gradient Up", name: "gradientUp" },
      { label: "Gradient Down", name: "gradientDown" },
    ],
    color: "#02A291",
  },
};

export function BackgroundCard() {
  const [type, setType] = useState("gradient");
  const [direction, setDirection] = useState("gradientUp");
  const [backgroundColour, setBackgroundColour] = useState("#02a291");

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
            {options.background.type.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {type === "gradient" ? (
            <>
              <Label>Gradient Direction</Label>
              <RadioGroup
                orientation="horizontal"
                defaultValue={direction}
                value={direction}
                onValueChange={setDirection}
              >
                {options.background.direction.map((option) => (
                  <div
                    key={option.name}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={option.name} id={option.name} />
                    <Label htmlFor={option.name}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : null}

          <Label htmlFor="background-colour">Background Colour</Label>

          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: backgroundColour }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={backgroundColour}
                  onChange={setBackgroundColour}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={backgroundColour}
              onChange={(e) => setBackgroundColour(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
