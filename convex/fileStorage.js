import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    fileName: v.string(),
    storageId: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { fileId, fileName, storageId, createdBy, fileUrl } = args;
    return await ctx.db.insert("pdfFiles", {
      fileId,
      fileName,
      storageId,
      createdBy,
      fileUrl,
    });
  },
});

export const getFileUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});

export const getFileRecord = query({
  args: { fileId: v.string() },
  handler: async (ctx, { fileId }) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), fileId))
      .collect();
    return result[0];
  },
});

export const GetUserFiles = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, { userEmail }) => {
    if (userEmail === undefined || userEmail === null) {
      return;
    }
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), userEmail))
      .collect();
    return result;
  },
});
