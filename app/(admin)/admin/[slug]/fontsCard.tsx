import { Card, CardContent, CardHeader } from "@/components/ui/card";

const backgroundOptions = [
  { label: "flat Colour", name: "flat" },
  { label: "Gradient", name: "gradient" },
];

const backgroundDirectionOptions = [
  { label: "Gradient Up", name: "gradientUp" },
  { label: "Gradient Down", name: "gradientDown" },
];

const defaultBackgroundColorOption = "#02a291";

export function FontsCard() {
  return (
    <Card>
      <CardHeader>Fonts</CardHeader>
      <CardContent>Placeholder</CardContent>
    </Card>
  );
}
