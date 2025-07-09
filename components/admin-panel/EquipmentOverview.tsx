"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

interface EquipmentHistoryItem {
  id: number;
  type: string;
  status: string;
  createdAt: string;
  repairCost: number | null;
}

interface EquipmentWithHistory {
  id: number;
  name: string;
  desc: string;
  active: boolean;
  history: EquipmentHistoryItem[];
}

interface EquipmentOverviewProps {
  equipment: EquipmentWithHistory[];
}

export default function EquipmentOverview({ equipment }: EquipmentOverviewProps) {
  const getEquipmentStatus = (equipmentItem: EquipmentWithHistory) => {
    if (!equipmentItem.active) return "inactive";
    
    const openIssues = equipmentItem.history.filter(
      h => h.status === "REPORTED" || h.status === "IN_PROGRESS"
    );
    
    const needsReplacement = equipmentItem.history.some(
      h => h.status === "NEEDS_REPLACEMENT"
    );
    
    if (needsReplacement) return "needs_replacement";
    if (openIssues.length > 0) return "has_issues";
    return "good";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "has_issues":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "needs_replacement":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "inactive":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "secondary";
      case "has_issues":
        return "default";
      case "needs_replacement":
        return "destructive";
      case "inactive":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "good":
        return "Good";
      case "has_issues":
        return "Has Issues";
      case "needs_replacement":
        return "Needs Replacement";
      case "inactive":
        return "Inactive";
      default:
        return "Unknown";
    }
  };

  const getMaintenanceAlert = () => {
    const criticalEquipment = equipment.filter(eq => {
      const status = getEquipmentStatus(eq);
      return status === "needs_replacement" || status === "has_issues";
    });

    if (criticalEquipment.length === 0) return null;

    return (
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          {criticalEquipment.length} equipment item(s) require attention. 
          Check the equipment list below for details.
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="space-y-6">
      {getMaintenanceAlert()}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipment.map((item) => {
          const status = getEquipmentStatus(item);
          const openIssues = item.history.filter(
            h => h.status === "REPORTED" || h.status === "IN_PROGRESS"
          ).length;
          const totalCost = item.history.reduce(
            (sum, h) => sum + (h.repairCost || 0), 0
          );

          return (
            <Card key={item.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(status)}
                    <Badge variant={getStatusColor(status) as any}>
                      {getStatusLabel(status)}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Open Issues:</span>
                    <span className={openIssues > 0 ? "text-yellow-600 font-medium" : ""}>
                      {openIssues}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Repairs:</span>
                    <span>{item.history.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Cost:</span>
                    <span className={totalCost > 0 ? "font-medium" : ""}>
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {equipment.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No equipment found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
