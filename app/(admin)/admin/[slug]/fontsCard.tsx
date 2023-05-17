import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { ThemeProps } from "@/lib/types";
import FontSelector from "@/components/admin/appearance/font-selector";

const options = {
  fonts: [{ label: "DM Sans", name: "dm sans" }],
};

interface FontsCardProps {
  theme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
}

export function FontsCard({ theme, setTheme }: FontsCardProps) {
  const familyChangedHandler = (value: string) => {
    setTheme({ ...theme, typefaceFamily: value });
  };

  const fontColorChangedHandler = (value: string) => {
    setTheme({ ...theme, typefaceColor: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fonts</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <Label>Family</Label>
          <FontSelector
            currentFont={theme.typefaceFamily}
            setCurrentFont={familyChangedHandler}
            fonts={options.fonts || []}
          />

          <Label>Color</Label>

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
                  onChange={fontColorChangedHandler}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={theme.typefaceColor}
              onChange={(e) => fontColorChangedHandler(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
