import { BackgroundCard } from "./backgroundCard";
import { ButtonsCard } from "./buttonsCard";
import { FontsCard } from "./fontsCard";

export function Appearance() {
  return (
    <div className="flex flex-col space-y-2">
      <BackgroundCard />
      <ButtonsCard />
      <FontsCard />
    </div>
  );
}
