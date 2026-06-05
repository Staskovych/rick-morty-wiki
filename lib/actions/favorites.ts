"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addFavorite(characterId: number): Promise<void> {
  await prisma.favorite.create({
    data: { characterId },
  });
  revalidatePath("/");
  revalidatePath("/characters");
  revalidatePath("/favorites");
  revalidatePath(`/characters/${characterId}`);
}

export async function removeFavorite(characterId: number): Promise<void> {
  await prisma.favorite.delete({
    where: { characterId },
  });
  revalidatePath("/");
  revalidatePath("/characters");
  revalidatePath("/favorites");
  revalidatePath(`/characters/${characterId}`);
}
