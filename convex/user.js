import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length == 0) {
      await ctx.db.insert("users", {
        userName: args.userName,
        email: args.email,
        imageUrl: args.imageUrl,
        upgrade: false, // Default value for upgrade
      });
      return "Inserted user";
    }
    return "User already exists";
  },
});

export const updateUserUpgrade = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user) {
      await ctx.db.patch(user[0]._id, { upgrade: true });
      return "Successfully updated user upgrade status";
    }
    return "User not found";
  },
});

export const getUserInfo = query({
  args: {
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length > 0) {
      return user[0];
    }
    return null;
  },
});
