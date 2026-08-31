import type {
  Alert,
  ActivityEvent,
  Batch,
  Branch,
  DispensingTask,
  Expense,
  GoodsReceivedNote,
  InventoryItem,
  Medicine,
  Organization,
  Patient,
  Payment,
  Prescription,
  PurchaseOrder,
  ReconciliationSession,
  Refund,
  RevenuePoint,
  RoleDefinition,
  Sale,
  SecurityEvent,
  StaffMember,
  StockAdjustment,
  StockTransfer,
  Supplier,
  User,
} from "@/types/domain";

// NOTE: This file is mock data for frontend development only.
// Production data flows exclusively through /src/services (typed API clients).
// Nothing here should ever be imported by a services/*.ts file.

export const mockOrganization: Organization = {
  id: "org_hovapharm_gh",
  name: "Hovapharm Health Group",
};

export const mockBranches: Branch[] = [
  { id: "br_accra_central", name: "Accra Central Pharmacy", city: "Accra", isHeadOffice: true },
  { id: "br_east_legon", name: "East Legon Branch", city: "Accra", isHeadOffice: false },
  { id: "br_kumasi", name: "Kumasi Adum Branch", city: "Kumasi", isHeadOffice: false },
];

export const mockCurrentUser: User = {
  id: "usr_001",
  name: "John Mensah",
  email: "j.mensah@hovapharm.com",
  role: "pharmacist",
  avatarInitials: "JM",
  branchIds: ["br_accra_central"],
};

const medicineSeed: Array<Omit<Medicine, "id">> = [
  { genericName: "Paracetamol", brandName: "Paralex", strength: "500mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Ernest Chemists", category: "Analgesic", therapeuticClass: "Antipyretic", sku: "MED-1001", barcode: "6001234510017", requiresPrescription: false, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 8.5, costPrice: 5.2 },
  { genericName: "Amoxicillin", brandName: "Amoxil", strength: "500mg", dosageForm: "Capsule", route: "Oral", manufacturer: "GSK Ghana", category: "Antibiotic", therapeuticClass: "Penicillin", sku: "MED-1002", barcode: "6001234510024", requiresPrescription: true, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 24.0, costPrice: 16.4 },
  { genericName: "Metformin", brandName: "Glucophage", strength: "500mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Merck", category: "Antidiabetic", therapeuticClass: "Biguanide", sku: "MED-1003", barcode: "6001234510031", requiresPrescription: true, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 18.75, costPrice: 11.9 },
  { genericName: "Amlodipine", brandName: "Norvasc", strength: "10mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Pfizer", category: "Antihypertensive", therapeuticClass: "Calcium Channel Blocker", sku: "MED-1004", barcode: "6001234510048", requiresPrescription: true, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 22.3, costPrice: 14.1 },
  { genericName: "Omeprazole", brandName: "Losec", strength: "20mg", dosageForm: "Capsule", route: "Oral", manufacturer: "AstraZeneca", category: "Gastrointestinal", therapeuticClass: "Proton Pump Inhibitor", sku: "MED-1005", barcode: "6001234510055", requiresPrescription: false, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 15.6, costPrice: 9.8 },
  { genericName: "Artemether/Lumefantrine", brandName: "Coartem", strength: "20/120mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Novartis", category: "Antimalarial", therapeuticClass: "Artemisinin Combination", sku: "MED-1006", barcode: "6001234510062", requiresPrescription: false, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 32.0, costPrice: 21.5 },
  { genericName: "Diazepam", brandName: "Valium", strength: "5mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Roche", category: "Anxiolytic", therapeuticClass: "Benzodiazepine", sku: "MED-1007", barcode: "6001234510079", requiresPrescription: true, isControlled: true, storageRequirement: "Locked cabinet", sellingPrice: 12.4, costPrice: 7.6 },
  { genericName: "Cetirizine", brandName: "Zyrtec", strength: "10mg", dosageForm: "Tablet", route: "Oral", manufacturer: "UCB", category: "Antihistamine", therapeuticClass: "H1 Antagonist", sku: "MED-1008", barcode: "6001234510086", requiresPrescription: false, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 9.9, costPrice: 6.1 },
  { genericName: "Salbutamol", brandName: "Ventolin", strength: "100mcg", dosageForm: "Inhaler", route: "Inhalation", manufacturer: "GSK Ghana", category: "Respiratory", therapeuticClass: "Bronchodilator", sku: "MED-1009", barcode: "6001234510093", requiresPrescription: true, isControlled: false, storageRequirement: "Below 30°C", sellingPrice: 45.0, costPrice: 31.2 },
  { genericName: "Ciprofloxacin", brandName: "Ciproxin", strength: "500mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Bayer", category: "Antibiotic", therapeuticClass: "Fluoroquinolone", sku: "MED-1010", barcode: "6001234510109", requiresPrescription: true, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 28.5, costPrice: 19.0 },
  { genericName: "Ibuprofen", brandName: "Brufen", strength: "400mg", dosageForm: "Tablet", route: "Oral", manufacturer: "Abbott", category: "Analgesic", therapeuticClass: "NSAID", sku: "MED-1011", barcode: "6001234510116", requiresPrescription: false, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 10.2, costPrice: 6.4 },
  { genericName: "Amoxicillin/Clavulanate", brandName: "Augmentin", strength: "625mg", dosageForm: "Tablet", route: "Oral", manufacturer: "GSK Ghana", category: "Antibiotic", therapeuticClass: "Penicillin Combination", sku: "MED-1012", barcode: "6001234510123", requiresPrescription: true, isControlled: false, storageRequirement: "Room temperature", sellingPrice: 38.0, costPrice: 26.5 },
];

export const mockMedicines: Medicine[] = medicineSeed.map((m, i) => ({ id: `med_${1001 + i}`, ...m }));

export const mockInventory: InventoryItem[] = [
  { id: "inv_001", medicine: mockMedicines[0], branchId: "br_accra_central", quantityOnHand: 1240, quantityReserved: 40, minimumStock: 300, status: "in-stock", nearestExpiry: "2027-11-30", primarySupplier: "Ernest Chemists Ltd", margin: 38.8 },
  { id: "inv_002", medicine: mockMedicines[1], branchId: "br_accra_central", quantityOnHand: 84, quantityReserved: 12, minimumStock: 150, status: "low-stock", nearestExpiry: "2026-12-15", primarySupplier: "mPharma Distribution", margin: 31.7 },
  { id: "inv_003", medicine: mockMedicines[2], branchId: "br_accra_central", quantityOnHand: 22, quantityReserved: 6, minimumStock: 100, status: "critical", nearestExpiry: "2027-03-20", primarySupplier: "Kinapharma Ltd", margin: 36.5 },
  { id: "inv_004", medicine: mockMedicines[3], branchId: "br_accra_central", quantityOnHand: 310, quantityReserved: 8, minimumStock: 80, status: "in-stock", nearestExpiry: "2027-07-10", primarySupplier: "Kinapharma Ltd", margin: 36.8 },
  { id: "inv_005", medicine: mockMedicines[4], branchId: "br_accra_central", quantityOnHand: 0, quantityReserved: 0, minimumStock: 100, status: "out-of-stock", nearestExpiry: "—", primarySupplier: "Ernest Chemists Ltd", margin: 37.2 },
  { id: "inv_006", medicine: mockMedicines[5], branchId: "br_accra_central", quantityOnHand: 156, quantityReserved: 20, minimumStock: 60, status: "expiring-soon", nearestExpiry: "2026-09-22", primarySupplier: "Novartis Ghana", margin: 32.8 },
  { id: "inv_007", medicine: mockMedicines[6], branchId: "br_accra_central", quantityOnHand: 40, quantityReserved: 0, minimumStock: 20, status: "in-stock", nearestExpiry: "2027-01-05", primarySupplier: "Ernest Chemists Ltd", margin: 38.7 },
  { id: "inv_008", medicine: mockMedicines[8], branchId: "br_accra_central", quantityOnHand: 6, quantityReserved: 1, minimumStock: 15, status: "critical", nearestExpiry: "2027-05-18", primarySupplier: "GSK Ghana", margin: 30.7 },
];

// One or more received batches per inventory item — the lot-level detail behind
// each item's aggregate quantityOnHand. Batches never appear alone: they're
// always viewed in the context of an InventoryItem (see BatchDrawer).
export const mockBatches: Batch[] = [
  { id: "bat_001", medicineId: "med_1001", batchNumber: "PCM-2405", supplierName: "Ernest Chemists Ltd", purchaseDate: "2026-05-02", manufacturingDate: "2026-01-10", expiryDate: "2027-11-30", quantityReceived: 1000, quantityRemaining: 640, costPerUnit: 5.2, branchId: "br_accra_central" },
  { id: "bat_002", medicineId: "med_1001", batchNumber: "PCM-2408", supplierName: "Ernest Chemists Ltd", purchaseDate: "2026-08-14", manufacturingDate: "2026-06-02", expiryDate: "2028-06-30", quantityReceived: 600, quantityRemaining: 600, costPerUnit: 5.35, branchId: "br_accra_central" },
  { id: "bat_003", medicineId: "med_1002", batchNumber: "AMX-2407", supplierName: "mPharma Distribution", purchaseDate: "2026-07-05", manufacturingDate: "2026-02-18", expiryDate: "2026-12-15", quantityReceived: 200, quantityRemaining: 84, costPerUnit: 16.4, branchId: "br_accra_central" },
  { id: "bat_004", medicineId: "med_1003", batchNumber: "MET-2403", supplierName: "Kinapharma Ltd", purchaseDate: "2026-03-11", manufacturingDate: "2025-12-01", expiryDate: "2027-03-20", quantityReceived: 150, quantityRemaining: 22, costPerUnit: 11.9, branchId: "br_accra_central" },
  { id: "bat_005", medicineId: "med_1004", batchNumber: "AML-2406", supplierName: "Kinapharma Ltd", purchaseDate: "2026-06-20", manufacturingDate: "2026-01-15", expiryDate: "2027-07-10", quantityReceived: 310, quantityRemaining: 310, costPerUnit: 14.1, branchId: "br_accra_central" },
  { id: "bat_006", medicineId: "med_1006", batchNumber: "CRT-2406", supplierName: "Novartis Ghana", purchaseDate: "2026-06-01", manufacturingDate: "2025-09-10", expiryDate: "2026-09-22", quantityReceived: 200, quantityRemaining: 156, costPerUnit: 21.5, branchId: "br_accra_central" },
  { id: "bat_007", medicineId: "med_1007", batchNumber: "DZP-2401", supplierName: "Ernest Chemists Ltd", purchaseDate: "2026-01-18", manufacturingDate: "2025-08-05", expiryDate: "2027-01-05", quantityReceived: 40, quantityRemaining: 40, costPerUnit: 7.6, branchId: "br_accra_central" },
  { id: "bat_008", medicineId: "med_1009", batchNumber: "SLB-2405", supplierName: "GSK Ghana", purchaseDate: "2026-05-22", manufacturingDate: "2025-11-02", expiryDate: "2027-05-18", quantityReceived: 20, quantityRemaining: 6, costPerUnit: 31.2, branchId: "br_accra_central" },
];

export const mockRevenueSeries: RevenuePoint[] = [
  { label: "6am", today: 420, yesterday: 380 },
  { label: "8am", today: 1240, yesterday: 1100 },
  { label: "10am", today: 2680, yesterday: 2300 },
  { label: "12pm", today: 4950, yesterday: 4200 },
  { label: "2pm", today: 7300, yesterday: 6600 },
  { label: "4pm", today: 11800, yesterday: 9700 },
  { label: "6pm", today: 15900, yesterday: 13400 },
  { label: "8pm", today: 18420, yesterday: 16850 },
];

export const mockPrescriptions: Prescription[] = [
  { id: "rx_001", prescriptionNumber: "RX-10291", patientName: "Akosua Boateng", patientId: "pt_014", prescriber: "Dr. Kwame Owusu", date: "2026-08-30", status: "pending", itemCount: 3 },
  { id: "rx_002", prescriptionNumber: "RX-10292", patientName: "Kwabena Asare", patientId: "pt_027", prescriber: "Dr. Efua Mensah", date: "2026-08-30", status: "under-review", itemCount: 2 },
  { id: "rx_003", prescriptionNumber: "RX-10287", patientName: "Abena Sarpong", patientId: "pt_009", prescriber: "Dr. Kwame Owusu", date: "2026-08-29", status: "dispensed", itemCount: 1 },
  { id: "rx_004", prescriptionNumber: "RX-10288", patientName: "Yaw Darko", patientId: "pt_041", prescriber: "Dr. Nana Adjei", date: "2026-08-29", status: "partially-dispensed", itemCount: 4 },
];

export const mockPatients: Patient[] = [
  { id: "pt_014", name: "Akosua Boateng", phone: "+233 24 551 2290", dateOfBirth: "1990-04-12", sex: "Female", allergies: ["Penicillin"], lastVisit: "2026-08-30" },
  { id: "pt_027", name: "Kwabena Asare", phone: "+233 20 118 7734", dateOfBirth: "1985-11-03", sex: "Male", allergies: [], lastVisit: "2026-08-30" },
  { id: "pt_009", name: "Abena Sarpong", phone: "+233 27 902 4471", dateOfBirth: "1998-01-27", sex: "Female", allergies: ["Sulfa drugs"], lastVisit: "2026-08-29" },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: "po_1042", poNumber: "PO-1042", supplierName: "Ernest Chemists Ltd", createdDate: "2026-08-27", expectedDate: "2026-09-03", status: "pending-approval", itemCount: 12, total: 18400 },
  { id: "po_1041", poNumber: "PO-1041", supplierName: "Kinapharma Ltd", createdDate: "2026-08-25", expectedDate: "2026-08-31", status: "ordered", itemCount: 8, total: 9260 },
  { id: "po_1039", poNumber: "PO-1039", supplierName: "mPharma Distribution", createdDate: "2026-08-20", expectedDate: "2026-08-27", status: "partially-received", itemCount: 15, total: 24700 },
];

export const mockAlerts: Alert[] = [
  { id: "al_001", severity: "critical", title: "Metformin 500mg has fallen below minimum stock", description: "22 units remaining, minimum threshold is 100 units.", module: "Inventory", timestamp: "2026-08-30T08:12:00", actionLabel: "Reorder" },
  { id: "al_002", severity: "warning", title: "7 products expire within 30 days", description: "Includes Coartem 20/120mg (batch CRT-2406) and 6 others.", module: "Batches", timestamp: "2026-08-30T07:40:00", actionLabel: "Review batches" },
  { id: "al_003", severity: "warning", title: "Purchase order PO-1042 requires approval", description: "Submitted by Ama Owusu, ₵18,400 total, 12 line items.", module: "Procurement", timestamp: "2026-08-29T16:05:00", actionLabel: "Review" },
  { id: "al_004", severity: "information", title: "Prescription RX-10291 is awaiting verification", description: "Akosua Boateng — prescribed by Dr. Kwame Owusu.", module: "Prescriptions", timestamp: "2026-08-30T09:02:00", actionLabel: "Verify" },
  { id: "al_005", severity: "critical", title: "Daily reconciliation has not been completed", description: "Yesterday's cash session (Aug 29) is still open.", module: "Finance", timestamp: "2026-08-30T06:00:00", actionLabel: "Reconcile" },
];

export const mockActivity: ActivityEvent[] = [
  { id: "ev_001", actorName: "John Mensah", actorRole: "Pharmacist", action: "Dispensed prescription", target: "RX-10287 · Abena Sarpong", timestamp: "2026-08-30T14:32:00" },
  { id: "ev_002", actorName: "Ama Owusu", actorRole: "Inventory Officer", action: "Adjusted inventory", target: "Amoxicillin 500mg · Batch AMX-2407", detail: "120 → 115 units, reason: dispensing", timestamp: "2026-08-30T14:20:00" },
  { id: "ev_003", actorName: "Kojo Ampofo", actorRole: "Cashier", action: "Completed sale", target: "Transaction TXN-88213 · GH₵ 142.00", timestamp: "2026-08-30T13:55:00" },
  { id: "ev_004", actorName: "System", actorRole: "Automation", action: "Flagged low stock", target: "Metformin 500mg", timestamp: "2026-08-30T08:12:00" },
  { id: "ev_005", actorName: "John Mensah", actorRole: "Pharmacist", action: "Verified prescription", target: "RX-10288 · Yaw Darko", timestamp: "2026-08-29T17:44:00" },
];

// ==========================================================================
// Sales / POS / Dispensing
// ==========================================================================

export const mockSales: Sale[] = [
  {
    id: "txn_88213",
    transactionNumber: "TXN-88213",
    cashierName: "Kojo Ampofo",
    branchId: "br_accra_central",
    items: [
      { medicineId: "med_1001", medicineName: "Paracetamol 500mg", quantity: 2, unitPrice: 8.5 },
      { medicineId: "med_1011", medicineName: "Ibuprofen 400mg", quantity: 1, unitPrice: 10.2 },
    ],
    subtotal: 27.2,
    discount: 0,
    total: 27.2,
    paymentMethod: "mobile-money",
    timestamp: "2026-08-30T13:55:00",
  },
  {
    id: "txn_88212",
    transactionNumber: "TXN-88212",
    cashierName: "Kojo Ampofo",
    branchId: "br_accra_central",
    items: [{ medicineId: "med_1002", medicineName: "Amoxicillin 500mg", quantity: 1, unitPrice: 24.0 }],
    subtotal: 24.0,
    discount: 2.0,
    total: 22.0,
    paymentMethod: "cash",
    timestamp: "2026-08-30T13:20:00",
    patientName: "Kwabena Asare",
  },
  {
    id: "txn_88211",
    transactionNumber: "TXN-88211",
    cashierName: "Ama Owusu",
    branchId: "br_accra_central",
    items: [
      { medicineId: "med_1003", medicineName: "Metformin 500mg", quantity: 2, unitPrice: 18.75 },
      { medicineId: "med_1004", medicineName: "Amlodipine 10mg", quantity: 1, unitPrice: 22.3 },
    ],
    subtotal: 59.8,
    discount: 0,
    total: 59.8,
    paymentMethod: "insurance",
    timestamp: "2026-08-30T11:42:00",
    patientName: "Abena Sarpong",
  },
  {
    id: "txn_88210",
    transactionNumber: "TXN-88210",
    cashierName: "Kojo Ampofo",
    branchId: "br_accra_central",
    items: [{ medicineId: "med_1008", medicineName: "Cetirizine 10mg", quantity: 3, unitPrice: 9.9 }],
    subtotal: 29.7,
    discount: 0,
    total: 29.7,
    paymentMethod: "card",
    timestamp: "2026-08-30T10:05:00",
  },
  {
    id: "txn_88209",
    transactionNumber: "TXN-88209",
    cashierName: "Ama Owusu",
    branchId: "br_accra_central",
    items: [{ medicineId: "med_1006", medicineName: "Coartem 20/120mg", quantity: 1, unitPrice: 32.0 }],
    subtotal: 32.0,
    discount: 0,
    total: 32.0,
    paymentMethod: "cash",
    timestamp: "2026-08-29T16:30:00",
  },
];

export const mockDispensingQueue: DispensingTask[] = [
  { id: "disp_001", prescriptionNumber: "RX-10291", patientName: "Akosua Boateng", itemCount: 3, assignedTo: "John Mensah", priority: "urgent", status: "in-progress", queuedAt: "2026-08-30T09:05:00" },
  { id: "disp_002", prescriptionNumber: "RX-10292", patientName: "Kwabena Asare", itemCount: 2, assignedTo: "Unassigned", priority: "routine", status: "queued", queuedAt: "2026-08-30T09:40:00" },
  { id: "disp_003", prescriptionNumber: "RX-10288", patientName: "Yaw Darko", itemCount: 4, assignedTo: "John Mensah", priority: "routine", status: "on-hold", queuedAt: "2026-08-29T15:10:00" },
  { id: "disp_004", prescriptionNumber: "RX-10287", patientName: "Abena Sarpong", itemCount: 1, assignedTo: "John Mensah", priority: "routine", status: "ready", queuedAt: "2026-08-29T14:00:00" },
  { id: "disp_005", prescriptionNumber: "RX-10281", patientName: "Nana Yaw Boadi", itemCount: 2, assignedTo: "John Mensah", priority: "routine", status: "completed", queuedAt: "2026-08-29T10:20:00" },
];

// ==========================================================================
// Inventory — transfers, adjustments
// ==========================================================================

export const mockStockTransfers: StockTransfer[] = [
  { id: "trf_301", transferNumber: "TRF-301", medicineName: "Amoxicillin 500mg", quantity: 60, fromBranchId: "br_east_legon", toBranchId: "br_accra_central", requestedBy: "Ama Owusu", status: "in-transit", requestedDate: "2026-08-30" },
  { id: "trf_300", transferNumber: "TRF-300", medicineName: "Metformin 500mg", quantity: 40, fromBranchId: "br_kumasi", toBranchId: "br_accra_central", requestedBy: "Ama Owusu", status: "pending", requestedDate: "2026-08-29" },
  { id: "trf_299", transferNumber: "TRF-299", medicineName: "Paracetamol 500mg", quantity: 200, fromBranchId: "br_accra_central", toBranchId: "br_east_legon", requestedBy: "John Mensah", status: "received", requestedDate: "2026-08-26" },
  { id: "trf_298", transferNumber: "TRF-298", medicineName: "Salbutamol Inhaler", quantity: 10, fromBranchId: "br_accra_central", toBranchId: "br_kumasi", requestedBy: "John Mensah", status: "cancelled", requestedDate: "2026-08-22" },
];

export const mockStockAdjustments: StockAdjustment[] = [
  { id: "adj_401", medicineName: "Amoxicillin 500mg", type: "adjustment", quantity: -5, reason: "Damaged during handling", performedBy: "Ama Owusu", timestamp: "2026-08-30T14:20:00", balanceAfter: 84 },
  { id: "adj_400", medicineName: "Paracetamol 500mg", quantity: 600, type: "restock", reason: "Received PO-1041", performedBy: "Ama Owusu", timestamp: "2026-08-28T09:10:00", balanceAfter: 1240 },
  { id: "adj_399", medicineName: "Coartem 20/120mg", type: "wastage", quantity: -12, reason: "Expired batch removed", performedBy: "John Mensah", timestamp: "2026-08-27T11:00:00", balanceAfter: 156 },
  { id: "adj_398", medicineName: "Salbutamol Inhaler", type: "return", quantity: -2, reason: "Patient returned unopened units", performedBy: "Kojo Ampofo", timestamp: "2026-08-25T16:45:00", balanceAfter: 6 },
];

// ==========================================================================
// Procurement
// ==========================================================================

export const mockSuppliers: Supplier[] = [
  { id: "sup_001", name: "Ernest Chemists Ltd", contactName: "Yaw Frimpong", phone: "+233 30 222 1145", email: "orders@ernestchemists.com.gh", city: "Accra", leadTimeDays: 4, onTimeRate: 96, activeOrders: 2, totalSpend: 184200 },
  { id: "sup_002", name: "Kinapharma Ltd", contactName: "Efua Danso", phone: "+233 30 277 8820", email: "sales@kinapharma.com", city: "Accra", leadTimeDays: 6, onTimeRate: 91, activeOrders: 1, totalSpend: 96700 },
  { id: "sup_003", name: "mPharma Distribution", contactName: "Kojo Antwi", phone: "+233 24 400 5510", email: "supply@mpharma.com", city: "Accra", leadTimeDays: 5, onTimeRate: 88, activeOrders: 1, totalSpend: 142300 },
  { id: "sup_004", name: "GSK Ghana", contactName: "Abena Osei", phone: "+233 30 266 4471", email: "distribution@gsk.com.gh", city: "Accra", leadTimeDays: 8, onTimeRate: 93, activeOrders: 0, totalSpend: 210500 },
  { id: "sup_005", name: "Novartis Ghana", contactName: "Kwesi Amoah", phone: "+233 30 255 9012", email: "orders@novartis.com.gh", city: "Accra", leadTimeDays: 10, onTimeRate: 85, activeOrders: 0, totalSpend: 58900 },
];

export const mockGoodsReceived: GoodsReceivedNote[] = [
  { id: "grn_501", grnNumber: "GRN-501", poNumber: "PO-1039", supplierName: "mPharma Distribution", receivedDate: "2026-08-27", receivedBy: "Ama Owusu", itemCount: 15, discrepancy: true },
  { id: "grn_500", grnNumber: "GRN-500", poNumber: "PO-1038", supplierName: "Ernest Chemists Ltd", receivedDate: "2026-08-21", receivedBy: "Ama Owusu", itemCount: 10, discrepancy: false },
  { id: "grn_499", grnNumber: "GRN-499", poNumber: "PO-1035", supplierName: "GSK Ghana", receivedDate: "2026-08-14", receivedBy: "John Mensah", itemCount: 8, discrepancy: false },
];

// ==========================================================================
// Finance
// ==========================================================================

export const mockExpenses: Expense[] = [
  { id: "exp_701", description: "Branch rent — Accra Central", category: "rent", amount: 12000, date: "2026-08-01", approvedBy: "John Mensah" },
  { id: "exp_702", description: "Electricity & water", category: "utilities", amount: 1840, date: "2026-08-05", approvedBy: "John Mensah" },
  { id: "exp_703", description: "Staff salaries — August", category: "salaries", amount: 28500, date: "2026-08-28", approvedBy: "John Mensah" },
  { id: "exp_704", description: "Delivery van fuel & maintenance", category: "logistics", amount: 960, date: "2026-08-19", approvedBy: "Ama Owusu" },
  { id: "exp_705", description: "Refrigeration unit servicing", category: "maintenance", amount: 640, date: "2026-08-22", approvedBy: "Ama Owusu" },
];

export const mockPayments: Payment[] = [
  { id: "pay_801", reference: "PAY-88213", payerName: "Kojo Ampofo (POS)", amount: 27.2, method: "mobile-money", date: "2026-08-30", status: "completed" },
  { id: "pay_802", reference: "PAY-88212", payerName: "Kwabena Asare", amount: 22.0, method: "cash", date: "2026-08-30", status: "completed" },
  { id: "pay_803", reference: "PAY-1042-DEP", payerName: "Ernest Chemists Ltd (PO deposit)", amount: 9200, method: "card", date: "2026-08-27", status: "pending" },
  { id: "pay_804", reference: "PAY-88198", payerName: "Insurance Co-op Health", amount: 1240, method: "insurance", date: "2026-08-26", status: "failed" },
];

export const mockRefunds: Refund[] = [
  { id: "ref_901", refundNumber: "RF-901", originalTransaction: "TXN-88187", customerName: "Yaw Darko", amount: 45.0, reason: "Wrong item dispensed", date: "2026-08-29", status: "approved" },
  { id: "ref_902", refundNumber: "RF-902", originalTransaction: "TXN-88164", customerName: "Nana Yaw Boadi", amount: 18.5, reason: "Product returned unopened", date: "2026-08-27", status: "pending" },
  { id: "ref_903", refundNumber: "RF-903", originalTransaction: "TXN-88109", customerName: "Akosua Boateng", amount: 9.9, reason: "Duplicate charge", date: "2026-08-22", status: "rejected" },
];

export const mockReconciliations: ReconciliationSession[] = [
  { id: "rec_1001", branchId: "br_accra_central", date: "2026-08-29", openedBy: "Kojo Ampofo", expectedCash: 8420, countedCash: 8420, variance: 0, status: "open" },
  { id: "rec_1000", branchId: "br_accra_central", date: "2026-08-28", openedBy: "Kojo Ampofo", closedBy: "John Mensah", expectedCash: 7120, countedCash: 7085, variance: -35, status: "variance" },
  { id: "rec_0999", branchId: "br_accra_central", date: "2026-08-27", openedBy: "Ama Owusu", closedBy: "John Mensah", expectedCash: 6900, countedCash: 6900, variance: 0, status: "balanced" },
  { id: "rec_0998", branchId: "br_east_legon", date: "2026-08-27", openedBy: "Ama Owusu", closedBy: "John Mensah", expectedCash: 4210, countedCash: 4210, variance: 0, status: "balanced" },
];

// ==========================================================================
// Admin / Audit
// ==========================================================================

export const mockStaff: StaffMember[] = [
  { id: "usr_001", name: "John Mensah", email: "j.mensah@hovapharm.com", role: "pharmacist", avatarInitials: "JM", branchIds: ["br_accra_central"], status: "active", lastActive: "2026-08-30T14:32:00", joinedDate: "2024-02-10" },
  { id: "usr_002", name: "Ama Owusu", email: "a.owusu@hovapharm.com", role: "inventory-officer", avatarInitials: "AO", branchIds: ["br_accra_central"], status: "active", lastActive: "2026-08-30T14:20:00", joinedDate: "2024-06-03" },
  { id: "usr_003", name: "Kojo Ampofo", email: "k.ampofo@hovapharm.com", role: "cashier", avatarInitials: "KA", branchIds: ["br_accra_central"], status: "active", lastActive: "2026-08-30T13:55:00", joinedDate: "2025-01-20" },
  { id: "usr_004", name: "Nana Adjei", email: "n.adjei@hovapharm.com", role: "branch-manager", avatarInitials: "NA", branchIds: ["br_east_legon"], status: "active", lastActive: "2026-08-29T18:00:00", joinedDate: "2023-11-14" },
  { id: "usr_005", name: "Efua Mensah", email: "e.mensah@hovapharm.com", role: "pharmacy-technician", avatarInitials: "EM", branchIds: ["br_kumasi"], status: "invited", lastActive: "—", joinedDate: "2026-08-25" },
  { id: "usr_006", name: "Kwame Owusu", email: "k.owusu@hovapharm.com", role: "accountant", avatarInitials: "KO", branchIds: ["br_accra_central"], status: "suspended", lastActive: "2026-07-10T09:00:00", joinedDate: "2024-09-01" },
];

export const mockRoles: RoleDefinition[] = [
  { id: "role_super", name: "super-admin", label: "Super Admin", description: "Full access across all branches and settings.", userCount: 1, permissions: ["all"] },
  { id: "role_org", name: "org-admin", label: "Organization Admin", description: "Manage branches, staff, and organization settings.", userCount: 1, permissions: ["manage-staff", "manage-branches", "view-finance"] },
  { id: "role_branch", name: "branch-manager", label: "Branch Manager", description: "Full operational control within an assigned branch.", userCount: 1, permissions: ["manage-inventory", "manage-staff", "view-reports"] },
  { id: "role_pharm", name: "pharmacist", label: "Pharmacist", description: "Verify and dispense prescriptions, manage patient records.", userCount: 1, permissions: ["dispense", "manage-prescriptions", "view-patients"] },
  { id: "role_tech", name: "pharmacy-technician", label: "Pharmacy Technician", description: "Assist with dispensing under pharmacist supervision.", userCount: 1, permissions: ["assist-dispense", "view-inventory"] },
  { id: "role_cashier", name: "cashier", label: "Cashier", description: "Process sales and payments at the point of sale.", userCount: 1, permissions: ["process-sales", "view-inventory"] },
  { id: "role_inv", name: "inventory-officer", label: "Inventory Officer", description: "Manage stock levels, batches, and transfers.", userCount: 1, permissions: ["manage-inventory", "manage-transfers"] },
  { id: "role_acct", name: "accountant", label: "Accountant", description: "Manage financial records, reconciliation, and reporting.", userCount: 1, permissions: ["manage-finance", "view-reports"] },
  { id: "role_audit", name: "auditor", label: "Auditor", description: "Read-only access to activity and security logs.", userCount: 0, permissions: ["view-audit-logs"] },
];

export const mockSecurityEvents: SecurityEvent[] = [
  { id: "sec_001", type: "login-failed", actorName: "Unknown", ipAddress: "154.160.22.8", detail: "3 failed login attempts for k.owusu@hovapharm.com", severity: "warning", timestamp: "2026-08-30T02:14:00" },
  { id: "sec_002", type: "permission-change", actorName: "John Mensah", ipAddress: "41.66.203.11", detail: "Changed Efua Mensah's role to Pharmacy Technician", severity: "information", timestamp: "2026-08-29T16:02:00" },
  { id: "sec_003", type: "suspicious-activity", actorName: "System", ipAddress: "102.176.5.44", detail: "Unusual number of stock adjustments from a single account within 10 minutes", severity: "critical", timestamp: "2026-08-28T22:41:00" },
  { id: "sec_004", type: "password-reset", actorName: "Kojo Ampofo", ipAddress: "41.66.203.19", detail: "Password reset completed via email link", severity: "information", timestamp: "2026-08-27T08:15:00" },
  { id: "sec_005", type: "login-success", actorName: "Nana Adjei", ipAddress: "154.160.44.2", detail: "Login from new device (East Legon branch)", severity: "information", timestamp: "2026-08-26T07:50:00" },
];
