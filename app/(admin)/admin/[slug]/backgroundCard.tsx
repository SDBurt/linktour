import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThemeBackgroundStyleProps, ThemeProps } from "@/lib/types";
import { HexColorPicker } from "react-colorful";

const options = {
  background: {
    style: [
      { label: "Flat Colour", name: "FLAT" },
      { label: "Gradient Up", name: "COLORUP" },
      { label: "Gradient Down", name: "COLORDOWN" },
    ],
    color: "#02A291",
  },
};

interface BackgroundCardProps {
  theme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
}

export function BackgroundCard({ theme, setTheme }: BackgroundCardProps) {
  const styleChangedHandler = (value: ThemeBackgroundStyleProps) => {
    setTheme({ ...theme, backgroundStyle: value });
  };

  const colorChangedHandler = (value: string) => {
    setTheme({ ...theme, backgroundColor: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col space-y-4">
          <Label>Style</Label>
          <RadioGroup
            defaultValue={theme.backgroundStyle}
            orientation="vertical"
            value={theme.backgroundStyle}
            onValueChange={styleChangedHandler}
          >
            {options.background.style.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <Label htmlFor="background-colour">Background Colour</Label>

          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <div
                  className={"h-10 w-10 rounded"}
                  style={{ backgroundColor: theme.backgroundColor }}
                ></div>
              </DialogTrigger>
              <DialogContent className="w-62 p-8">
                <HexColorPicker
                  color={theme.backgroundColor}
                  onChange={colorChangedHandler}
                />
              </DialogContent>
            </Dialog>
            <Input
              id="background-colour"
              value={theme.backgroundColor}
              onChange={(e) => colorChangedHandler(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
