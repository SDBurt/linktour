"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";

const options = {
  fonts: [{ label: "DM Sans", name: "dm sans" }],
};

type FontItemType = { label: string; name: string };

interface FontSelectorProps {
  fonts: FontItemType[];
  currentFont: FontItemType;
  setCurrentFont: (FontItemType) => void;
}

function FontSelector({
  fonts,
  currentFont,
  setCurrentFont,
}: FontSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentFont ? currentFont.label : "Select Font..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandEmpty>No fonts found.</CommandEmpty>
          <CommandGroup>
            {fonts.map((font) => (
              <CommandItem
                key={font.name}
                onSelect={(currentValue) => {
                  setOpen(false);
                  setCurrentFont(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentFont.name === font.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {font.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function FontsCard() {
  const [currentFont, setCurrentFont] = useState<FontItemType>({
    label: "DM Sans",
    name: "dm sans",
  });
  const [fontColour, setFontColour] = useState("#02a291");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fonts</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <Label>Family</Label>
          <FontSelector
            currentFont={currentFont}
            setCurrentFont={setCurrentFont}
            fonts={options.fonts || []}
          />

          <Label>Button Colour</Label>

          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: fontColour }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker color={fontColour} onChange={setFontColour} />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={fontColour}
              onChange={(e) => setFontColour(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
