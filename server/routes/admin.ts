import { RequestHandler } from "express";
import { z } from "zod";
import {
  initializeFirebaseAdmin,
  FirebaseAdminService,
} from "../lib/firebase-admin";

initializeFirebaseAdmin();

// Validation schemas
const UserIdSchema = z.string().regex(/^[a-zA-Z0-9]{28}$/, "Invalid user ID");
const BanReasonSchema = z.string().min(5).max(500);
const PlanSchema = z.enum(["Free", "Classic", "Pro"]);
const LicenseKeySchema = z.string().min(10).max(255);

const extractIdToken = (authHeader: string | undefined): string => {
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }
  const token = authHeader.slice(7).trim();
  if (!token || token.length < 10 || token.length > 3000) {
    throw new Error("Invalid token format");
  }
  return token;
};

// Get all users
export const handleGetAllUsers: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const users = await FirebaseAdminService.getAllUsers();

    return res.json({ success: true, users });
  } catch (error) {
    console.error("Get users error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(401).json({ success: false, message });
  }
};

// Promote user to admin
export const handlePromoteUser: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId } = z.object({ userId: UserIdSchema }).parse(req.body);

    await FirebaseAdminService.promoteUser(adminUid, userId);

    return res.json({ success: true, message: "User promoted to admin" });
  } catch (error) {
    console.error("Promote user error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Demote admin to user
export const handleDemoteUser: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId } = z.object({ userId: UserIdSchema }).parse(req.body);

    await FirebaseAdminService.demoteUser(adminUid, userId);

    return res.json({ success: true, message: "User demoted" });
  } catch (error) {
    console.error("Demote user error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Ban user
export const handleBanUser: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId, reason } = z
      .object({
        userId: UserIdSchema,
        reason: BanReasonSchema,
      })
      .parse(req.body);

    await FirebaseAdminService.banUser(adminUid, userId, reason);

    return res.json({ success: true, message: "User banned" });
  } catch (error) {
    console.error("Ban user error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Unban user
export const handleUnbanUser: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId } = z.object({ userId: UserIdSchema }).parse(req.body);

    await FirebaseAdminService.unbanUser(adminUid, userId);

    return res.json({ success: true, message: "User unbanned" });
  } catch (error) {
    console.error("Unban user error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Reset user messages
export const handleResetMessages: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId } = z.object({ userId: UserIdSchema }).parse(req.body);

    await FirebaseAdminService.resetUserMessages(adminUid, userId);

    return res.json({ success: true, message: "Messages reset" });
  } catch (error) {
    console.error("Reset messages error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Delete user
export const handleDeleteUser: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId } = z.object({ userId: UserIdSchema }).parse(req.body);

    await FirebaseAdminService.deleteUser(adminUid, userId);

    return res.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Delete user error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Update user plan
export const handleUpdateUserPlan: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { userId, plan } = z
      .object({
        userId: UserIdSchema,
        plan: PlanSchema,
      })
      .parse(req.body);

    await FirebaseAdminService.updateUserPlan(adminUid, userId, plan);

    return res.json({ success: true, message: "User plan updated" });
  } catch (error) {
    console.error("Update user plan error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Get licenses
export const handleGetLicenses: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    await FirebaseAdminService.verifyAdmin(idToken);

    const licenses = await FirebaseAdminService.getAllLicenses();

    return res.json({ success: true, licenses });
  } catch (error) {
    console.error("Get licenses error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(401).json({ success: false, message });
  }
};

// Create license
export const handleCreateLicense: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { plan, validityDays } = z
      .object({
        plan: PlanSchema,
        validityDays: z.number().int().min(1).max(3650),
      })
      .parse(req.body);

    const licenseKey = await FirebaseAdminService.createLicense(
      adminUid,
      plan,
      validityDays,
    );

    return res.json({ success: true, license: { key: licenseKey, plan } });
  } catch (error) {
    console.error("Create license error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Invalidate license
export const handleInvalidateLicense: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { licenseKey } = z
      .object({
        licenseKey: LicenseKeySchema,
      })
      .parse(req.body);

    await FirebaseAdminService.invalidateLicense(adminUid, licenseKey);

    return res.json({ success: true, message: "License invalidated" });
  } catch (error) {
    console.error("Invalidate license error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Delete license
export const handleDeleteLicense: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { licenseKey } = z
      .object({
        licenseKey: LicenseKeySchema,
      })
      .parse(req.body);

    await FirebaseAdminService.deleteLicense(adminUid, licenseKey);

    return res.json({ success: true, message: "License deleted" });
  } catch (error) {
    console.error("Delete license error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Get AI config
export const handleGetAIConfig: RequestHandler = async (req, res) => {
  try {
    const config = await FirebaseAdminService.getAIConfig();
    return res.json(config);
  } catch (error) {
    console.error("Get AI config error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(500).json({ success: false, message });
  }
};

// Update AI config
export const handleUpdateAIConfig: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const config = z
      .object({
        model: z.string().min(1).max(100),
        temperature: z.number().min(0).max(2),
        maxTokens: z.number().int().min(100).max(4000),
        systemPrompt: z.string().max(2000),
      })
      .parse(req.body);

    await FirebaseAdminService.updateAIConfig(adminUid, config);

    return res.json({ success: true, config });
  } catch (error) {
    console.error("Update AI config error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Get system stats
export const handleGetSystemStats: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    await FirebaseAdminService.verifyAdmin(idToken);

    const stats = await FirebaseAdminService.getSystemStats();

    return res.json(stats);
  } catch (error) {
    console.error("Get system stats error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(401).json({ success: false, message });
  }
};

// Purge invalid licenses
export const handlePurgeLicenses: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const deleted = await FirebaseAdminService.purgeInvalidLicenses(adminUid);

    return res.json({ success: true, deleted });
  } catch (error) {
    console.error("Purge licenses error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(401).json({ success: false, message });
  }
};

// Get admin logs
export const handleGetAdminLogs: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    await FirebaseAdminService.verifyAdmin(idToken);

    const logs = await FirebaseAdminService.getAdminLogs();

    return res.json({ success: true, logs });
  } catch (error) {
    console.error("Get admin logs error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(401).json({ success: false, message });
  }
};

// Clear old logs
export const handleClearOldLogs: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);

    const { daysOld } = z
      .object({
        daysOld: z.number().int().min(1).max(365).optional().default(90),
      })
      .parse(req.body);

    const deleted = await FirebaseAdminService.clearOldLogs(adminUid, daysOld);

    return res.json({ success: true, deleted });
  } catch (error) {
    console.error("Clear old logs error:", error);
    const status = error instanceof z.ZodError ? 400 : 401;
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(status).json({ success: false, message });
  }
};

// Get banned users
export const handleGetBannedUsers: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    await FirebaseAdminService.verifyAdmin(idToken);

    const bannedUsers = await FirebaseAdminService.getBannedUsers();

    return res.json({ success: true, bannedUsers });
  } catch (error) {
    console.error("Get banned users error:", error);
    const message = error instanceof Error ? error.message : "Operation failed";
    return res.status(401).json({ success: false, message });
  }
};

// Verify admin
export const handleVerifyAdmin: RequestHandler = async (req, res) => {
  try {
    const idToken = extractIdToken(req.headers.authorization);
    const adminUid = await FirebaseAdminService.verifyAdmin(idToken);
    return res.json({ success: true, adminUid });
  } catch (error) {
    console.error("Verify admin error:", error);
    const message = error instanceof Error ? error.message : "Unauthorized";
    return res.status(401).json({ success: false, message });
  }
};
