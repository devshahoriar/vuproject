"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createEquipmentHistory } from "@/lib/actions/equipment-history";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Equipment {
  id: number;
  name: string;
  desc: string;
  active: boolean;
}

interface EquipmentHistoryFormProps {
  equipment: Equipment[];
  currentUserId: string;
}

const historyTypes = [
  { value: "MAINTENANCE", label: "Maintenance Required" },
  { value: "REPAIR", label: "Needs Repair" },
  { value: "DAMAGE", label: "Damaged" },
  { value: "DESTROYED", label: "Destroyed" },
  { value: "MALFUNCTION", label: "Malfunction" },
  { value: "REPLACEMENT", label: "Needs Replacement" },
];

export default function EquipmentHistoryForm({ equipment, currentUserId }: EquipmentHistoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    equipmentId: "",
    title: "",
    description: "",
    type: "",
    damagedBy: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createEquipmentHistory(
        parseInt(formData.equipmentId),
        currentUserId,
        formData.title,
        formData.description,
        formData.type as any,
        formData.damagedBy || undefined
      );

      if (result.success) {
        toast.success("Equipment history reported successfully");
        setFormData({
          equipmentId: "",
          title: "",
          description: "",
          type: "",
          damagedBy: "",
        });
        router.refresh();
      } else {
        toast.error(result.error || "Failed to report equipment history");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while reporting equipment history");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report Equipment Issue</CardTitle>
        <CardDescription>
          Report equipment problems, maintenance needs, or damage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment</Label>
            <Select 
              value={formData.equipmentId} 
              onValueChange={(value) => handleInputChange("equipmentId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipment.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Issue Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {historyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the problem"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="damagedBy">Damaged By (Optional)</Label>
            <Input
              id="damagedBy"
              type="text"
              placeholder="Name of person who damaged the equipment"
              value={formData.damagedBy}
              onChange={(e) => handleInputChange("damagedBy", e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !formData.equipmentId || !formData.title || !formData.description || !formData.type}
          >
            {isSubmitting ? "Submitting..." : "Report Issue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
