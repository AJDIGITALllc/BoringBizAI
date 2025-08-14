import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AuditResult, AuditRequest } from "@/types/audit";

export function useAudits() {
  return useQuery<AuditResult[]>({
    queryKey: ["/api", "audits"],
  });
}

export function useAuditMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (auditData: AuditRequest): Promise<AuditResult> => {
      const response = await apiRequest("POST", "/api/audits", auditData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api", "audits"] });
    },
  });
}

export function useRecentAudits() {
  return useQuery<AuditResult[]>({
    queryKey: ["/api", "audits", "recent"],
  });
}
