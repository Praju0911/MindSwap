
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart } from "lucide-react";

const ProgressTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Progress</CardTitle>
        <CardDescription>
          Track your progress in the skills you're learning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <LineChart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">
            We're working on building progress tracking features
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTabContent;
