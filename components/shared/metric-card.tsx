import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  children: React.ReactNode;
}

const MetricCard = ({ label, value, subValue, children }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-md font-medium">{label}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold">{value}</h2>
        {subValue ?? (
          <p className="text-muted-foreground text-sm">{subValue}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
