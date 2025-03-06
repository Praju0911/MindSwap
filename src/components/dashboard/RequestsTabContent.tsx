
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

const RequestsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Requests</CardTitle>
        <CardDescription>
          Manage requests from people who want to learn from you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No requests yet</h3>
          <p className="text-muted-foreground">
            When someone wants to learn from you, requests will appear here
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestsTabContent;
