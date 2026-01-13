// src/services/audit.service.ts
import { authFetch } from '@/shared/api';
import type { AuditRejectPayload } from '@/features/audit/types';

// export async function getAuditDetail(id: string) {
//   const response = await authFetch(`/api/v1/admin/audits/${id}`, {
//     method: 'GET',
//   });
//   return response.json();
// }

// export async function approveAudit(id: string) {
//   const response = await authFetch(`/api/v1/admin/audits/${id}/approve`, {
//     method: 'POST',
//   });
//   return response.json();
// }

// export async function rejectAudit(id: string, payload: AuditRejectPayload) {
//   const response = await authFetch(`/api/v1/admin/audits/${id}/reject`, {
//     method: 'POST',
//     body: JSON.stringify(payload),
//   });
//   return response.json();
// }
