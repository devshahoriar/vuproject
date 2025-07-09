"use server";

import db from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the enums directly since they don't exist in the client yet
enum EquipmentHistoryType {
  MAINTENANCE = "MAINTENANCE",
  REPAIR = "REPAIR",
  DAMAGE = "DAMAGE",
  DESTROYED = "DESTROYED",
  MALFUNCTION = "MALFUNCTION",
  REPLACEMENT = "REPLACEMENT",
}

enum EquipmentHistoryStatus {
  REPORTED = "REPORTED",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  NEEDS_REPLACEMENT = "NEEDS_REPLACEMENT",
}

export async function createEquipmentHistory(
  equipmentId: number,
  reportedById: string,
  title: string,
  description: string,
  type: EquipmentHistoryType,
  damagedBy?: string
) {
  try {
    await db.equipmentHistory.create({
      data: {
        equipmentId,
        reportedById,
        title,
        description,
        type,
        damagedBy,
        status: EquipmentHistoryStatus.REPORTED,
      },
    });

    revalidatePath("/dashboard/equipment");
    return { success: true };
  } catch (error) {
    console.error("Error creating equipment history:", error);
    return { success: false, error: "Failed to create equipment history" };
  }
}

export async function updateEquipmentHistoryStatus(
  historyId: number,
  status: EquipmentHistoryStatus,
  resolvedById?: string,
  repairCost?: number
) {
  try {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (status === EquipmentHistoryStatus.RESOLVED) {
      updateData.resolvedAt = new Date();
      updateData.resolvedById = resolvedById;
    }

    if (repairCost !== undefined) {
      updateData.repairCost = repairCost;
    }

    await db.equipmentHistory.update({
      where: { id: historyId },
      data: updateData,
    });

    revalidatePath("/dashboard/equipment");
    return { success: true };
  } catch (error) {
    console.error("Error updating equipment history:", error);
    return { success: false, error: "Failed to update equipment history" };
  }
}

export async function getEquipmentHistory(equipmentId?: number) {
  try {
    const where = equipmentId ? { equipmentId } : {};

    const history = await db.equipmentHistory.findMany({
      where,
      include: {
        equipment: true,
        reportedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        resolvedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert dates to strings for client components
    const serializedHistory = history.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      resolvedAt: item.resolvedAt?.toISOString() || null,
    }));

    return { success: true, data: serializedHistory };
  } catch (error) {
    console.error("Error fetching equipment history:", error);
    return { success: false, error: "Failed to fetch equipment history" };
  }
}

export async function getEquipmentWithHistory() {
  try {
    const equipment = await db.equipment.findMany({
      include: {
        image: true,
        history: {
          include: {
            reportedBy: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
            resolvedBy: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Convert dates to strings for client components
    const serializedEquipment = equipment.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      history: item.history.map(h => ({
        ...h,
        createdAt: h.createdAt.toISOString(),
        updatedAt: h.updatedAt.toISOString(),
        resolvedAt: h.resolvedAt?.toISOString() || null,
      })),
    }));

    return { success: true, data: serializedEquipment };
  } catch (error) {
    console.error("Error fetching equipment with history:", error);
    return { success: false, error: "Failed to fetch equipment with history" };
  }
}
