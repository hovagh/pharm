// ==========================================================================
// HovaPharm domain types
// These describe shapes returned by the API layer (see /src/services).
// The frontend never computes business rules from these — it only renders
// what the backend has already decided.
// ==========================================================================

export type StockStatus = "in-stock" | "low-stock" | "critical" | "out-of-stock" | "expired" | "expiring-soon";

export type Role =
  | "super-admin"
  | "org-admin"
  | "branch-manager"
  | "pharmacist"
  | "pharmacy-technician"
  | "cashier"
  | "inventory-officer"
  | "accountant"
  | "auditor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarInitials: string;
  branchIds: string[];
}

export interface Organization {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  isHeadOffice: boolean;
}

export interface Medicine {
  id: string;
  genericName: string;
  brandName: string;
  strength: string;
  dosageForm: "Tablet" | "Capsule" | "Syrup" | "Injection" | "Cream" | "Drops" | "Inhaler";
  route: string;
  manufacturer: string;
  category: string;
  therapeuticClass: string;
  sku: string;
  barcode: string;
  requiresPrescription: boolean;
  isControlled: boolean;
  storageRequirement: string;
  sellingPrice: number;
  costPrice: number;
}

export interface Batch {
  id: string;
  medicineId: string;
  batchNumber: string;
  supplierName: string;
  purchaseDate: string;
  manufacturingDate: string;
  expiryDate: string;
  quantityReceived: number;
  quantityRemaining: number;
  costPerUnit: number;
  branchId: string;
}

export interface InventoryItem {
  id: string;
  medicine: Medicine;
  branchId: string;
  quantityOnHand: number;
  quantityReserved: number;
  minimumStock: number;
  status: StockStatus;
  nearestExpiry: string;
  primarySupplier: string;
  margin: number;
}

export type PrescriptionStatus =
  | "pending"
  | "under-review"
  | "approved"
  | "partially-dispensed"
  | "dispensed"
  | "rejected"
  | "cancelled"
  | "expired";

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientName: string;
  patientId: string;
  prescriber: string;
  date: string;
  status: PrescriptionStatus;
  itemCount: number;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  sex: "Male" | "Female";
  allergies: string[];
  lastVisit: string;
}

export type PurchaseOrderStatus =
  | "draft"
  | "pending-approval"
  | "approved"
  | "ordered"
  | "partially-received"
  | "received"
  | "cancelled";

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  createdDate: string;
  expectedDate: string;
  status: PurchaseOrderStatus;
  itemCount: number;
  total: number;
}

export type AlertSeverity = "critical" | "warning" | "information" | "success";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  module: string;
  timestamp: string;
  actionLabel?: string;
}

export interface ActivityEvent {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  target: string;
  detail?: string;
  timestamp: string;
}

export interface RevenuePoint {
  label: string;
  today: number;
  yesterday: number;
}

// ==========================================================================
// Sales / POS / Dispensing
// ==========================================================================

export interface SaleLineItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod = "cash" | "mobile-money" | "card" | "insurance";

export interface Sale {
  id: string;
  transactionNumber: string;
  cashierName: string;
  branchId: string;
  items: SaleLineItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  patientName?: string;
}

export type DispensingStatus = "queued" | "in-progress" | "ready" | "completed" | "on-hold";

export interface DispensingTask {
  id: string;
  prescriptionNumber: string;
  patientName: string;
  itemCount: number;
  assignedTo: string;
  priority: "routine" | "urgent";
  status: DispensingStatus;
  queuedAt: string;
}

// ==========================================================================
// Inventory — batches, transfers, adjustments
// ==========================================================================

export type StockTransferStatus = "pending" | "in-transit" | "received" | "cancelled";

export interface StockTransfer {
  id: string;
  transferNumber: string;
  medicineName: string;
  quantity: number;
  fromBranchId: string;
  toBranchId: string;
  requestedBy: string;
  status: StockTransferStatus;
  requestedDate: string;
}

export type StockAdjustmentType = "restock" | "adjustment" | "wastage" | "return";

export interface StockAdjustment {
  id: string;
  medicineName: string;
  type: StockAdjustmentType;
  quantity: number;
  reason: string;
  performedBy: string;
  timestamp: string;
  balanceAfter: number;
}

// ==========================================================================
// Procurement
// ==========================================================================

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  leadTimeDays: number;
  onTimeRate: number;
  activeOrders: number;
  totalSpend: number;
}

export interface GoodsReceivedNote {
  id: string;
  grnNumber: string;
  poNumber: string;
  supplierName: string;
  receivedDate: string;
  receivedBy: string;
  itemCount: number;
  discrepancy: boolean;
}

// ==========================================================================
// Finance
// ==========================================================================

export type ExpenseCategory = "rent" | "utilities" | "salaries" | "logistics" | "maintenance" | "other";

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  approvedBy: string;
}

export interface Payment {
  id: string;
  reference: string;
  payerName: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Refund {
  id: string;
  refundNumber: string;
  originalTransaction: string;
  customerName: string;
  amount: number;
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export interface ReconciliationSession {
  id: string;
  branchId: string;
  date: string;
  openedBy: string;
  closedBy?: string;
  expectedCash: number;
  countedCash: number;
  variance: number;
  status: "open" | "balanced" | "variance";
}

// ==========================================================================
// Admin / Audit
// ==========================================================================

export interface StaffMember extends User {
  status: "active" | "invited" | "suspended";
  lastActive: string;
  joinedDate: string;
}

export interface RoleDefinition {
  id: string;
  name: Role;
  label: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export interface SecurityEvent {
  id: string;
  type: "login-failed" | "login-success" | "permission-change" | "password-reset" | "suspicious-activity";
  actorName: string;
  ipAddress: string;
  detail: string;
  severity: AlertSeverity;
  timestamp: string;
}

