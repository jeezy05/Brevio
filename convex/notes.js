import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddNotes = mutation({
  args: {
    fileId: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  },
  handler: async (ctx, { fileId, notes, createdBy }) => {
    const recordId = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), fileId))
      .collect();
    if (recordId.length == 0) {
      await ctx.db.insert("notes", {
        fileId,
        notes,
        createdBy,
      });
    } else {
      await ctx.db.patch(recordId[0]._id, {
        notes: notes,
      });
    }
  },
});

export const GetNotes = query({
  args: { fileId: v.string() },
  handler: async (ctx, { fileId }) => {
    const result = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), fileId))
      .collect();
    return result[0]?.notes;
  },
});
