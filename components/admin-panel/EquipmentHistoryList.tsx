"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateEquipmentHistoryStatus } from "@/lib/actions/equipment-history";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

interface EquipmentHistoryItem {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  damagedBy: string | null;
  repairCost: number | null;
  createdAt: string;
  resolvedAt: string | null;
  equipment: {
    id: number;
    name: string;
  };
  reportedBy: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  resolvedBy?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

interface EquipmentHistoryListProps {
  history: EquipmentHistoryItem[];
  currentUserId: string;
}

const statusColors = {
  REPORTED: "destructive",
  IN_PROGRESS: "default",
  RESOLVED: "secondary",
  NEEDS_REPLACEMENT: "destructive",
} as const;

const typeLabels = {
  MAINTENANCE: "Maintenance",
  REPAIR: "Repair",
  DAMAGE: "Damage",
  DESTROYED: "Destroyed",
  MALFUNCTION: "Malfunction",
  REPLACEMENT: "Replacement",
} as const;

const statusOptions = [
  { value: "REPORTED", label: "Reported" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "NEEDS_REPLACEMENT", label: "Needs Replacement" },
];

export default function EquipmentHistoryList({ history, currentUserId }: EquipmentHistoryListProps) {
  const [selectedHistory, setSelectedHistory] = useState<EquipmentHistoryItem | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleUpdateStatus = async () => {
    if (!selectedHistory || !newStatus) return;

    setIsUpdating(true);
    try {
      const result = await updateEquipmentHistoryStatus(
        selectedHistory.id,
        newStatus as any,
        newStatus === "RESOLVED" ? currentUserId : undefined,
        repairCost ? parseFloat(repairCost) : undefined
      );

      if (result.success) {
        toast.success("Status updated successfully");
        setDialogOpen(false);
        setSelectedHistory(null);
        setNewStatus("");
        setRepairCost("");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  const openUpdateDialog = (historyItem: EquipmentHistoryItem) => {
    setSelectedHistory(historyItem);
    setNewStatus(historyItem.status);
    setRepairCost(historyItem.repairCost?.toString() || "");
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Equipment History</CardTitle>
          <CardDescription>
            Track equipment issues, maintenance, and repairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.equipment.name}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description.length > 50 
                          ? `${item.description.substring(0, 50)}...` 
                          : item.description}
                      </div>
                      {item.damagedBy && (
                        <div className="text-sm text-red-600">
                          Damaged by: {item.damagedBy}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {typeLabels[item.type as keyof typeof typeLabels] || item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[item.status as keyof typeof statusColors] || "default"}>
                      {item.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.reportedBy.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.reportedBy.role}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{format(new Date(item.createdAt), "MMM dd, yyyy")}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(item.createdAt), "HH:mm")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.repairCost ? `$${item.repairCost.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUpdateDialog(item)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {history.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No equipment history found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Equipment Status</DialogTitle>
            <DialogDescription>
              Update the status of this equipment issue
            </DialogDescription>
          </DialogHeader>
          
          {selectedHistory && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedHistory.equipment.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedHistory.title}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repairCost">Repair Cost (Optional)</Label>
                <Input
                  id="repairCost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={repairCost}
                  onChange={(e) => setRepairCost(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={isUpdating || !newStatus}>
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
