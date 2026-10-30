import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_AUDIT_LOGS } from '../data/marketplaceData';
import { AuditLogItem } from '../types';
import { applySeo } from '../lib/seo';

export function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Client' | 'Specialist' | 'Admin' | 'System'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Success' | 'Warning' | 'Security Alert'>('All');

  useEffect(() => {
    applySeo({
      title: 'Cryptographic Audit Logs & Activity Ledger | KINETIQ Admin',
      description: 'System audit logs of all escrow locks, profile verifications, and security events.',
      canonicalPath: '/admin/audit-logs',
      noIndex: true,
    });

    try {
      const stored = localStorage.getItem('kinetiq_audit_logs');
      if (stored) setLogs(JSON.parse(stored));
      else setLogs(INITIAL_AUDIT_LOGS);
    } catch {
      setLogs(INITIAL_AUDIT_LOGS);
    }
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        log.actor.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.ipAddress.includes(q);

      const matchesRole = roleFilter === 'All' || log.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || log.status === statusFilter;

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [logs, searchQuery, roleFilter, statusFilter]);

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(filteredLogs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetiq_audit_logs_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Timestamp', 'Actor', 'Role', 'Action', 'Details', 'IP Address', 'Status'];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.actor,
      l.role,
      l.action,
      `"${l.details.replace(/"/g, '""')}"`,
      l.ipAddress,
      l.status,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetiq_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen py-10 px-margin-mobile md:px-margin max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-code-badge text-[#006a42] uppercase tracking-widest bg-[#ebf6ee] px-3 py-1 rounded-full border border-[#bccabf]/50 inline-block mb-2">
            IMMUTABLE SECURITY LEDGER // AUDIT ARCHIVE
          </span>
          <h1 className="font-headline-lg text-3xl font-bold text-[#141e19]">
            System Audit & Telemetry Logs
          </h1>
          <p className="font-body-md text-xs text-[#535f59] mt-1">
            Real-time chronological events across authentication, multi-sig escrow settlements, and verification badges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 border border-[#bccabf] hover:border-[#006a42] bg-white rounded-xl text-xs font-semibold text-[#141e19] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">csv</span>
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 bg-[#006a42] hover:bg-[#008655] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#bccabf] shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a70]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by actor email, action keyword, IP address, or details..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] text-xs text-[#141e19] focus:outline-none focus:ring-2 focus:ring-[#006a42]"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="p-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] text-xs font-semibold text-[#141e19]"
          >
            <option value="All">All Actors</option>
            <option value="Admin">Admin</option>
            <option value="System">System</option>
            <option value="Client">Client</option>
            <option value="Specialist">Specialist</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-2.5 rounded-xl bg-[#f1fcf4] border border-[#bccabf] text-xs font-semibold text-[#141e19]"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
            <option value="Security Alert">Security Alert</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#bccabf] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body-sm">
            <thead className="bg-[#ebf6ee] text-[#3d4a41] uppercase tracking-wider font-code-badge text-[10px]">
              <tr>
                <th className="p-3.5">Timestamp (UTC)</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Action Code</th>
                <th className="p-3.5">Details</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bccabf]/30 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f1fcf4]/50 transition-colors">
                  <td className="p-3.5 text-[#6d7a70] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3.5 font-sans font-semibold text-[#141e19]">
                    {log.actor}
                    <span className="block text-[10px] text-[#006a42] font-code-badge font-normal">
                      Role: {log.role}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-[#006a42]">{log.action}</td>
                  <td className="p-3.5 font-sans text-[#3d4a41] max-w-sm">{log.details}</td>
                  <td className="p-3.5 text-[#6d7a70]">{log.ipAddress}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[9px] font-code-badge px-2 py-0.5 rounded-full font-bold uppercase ${
                        log.status === 'Success'
                          ? 'bg-[#ebf6ee] text-[#006a42] border border-[#62dd9e]'
                          : log.status === 'Warning'
                          ? 'bg-[#fef9c3] text-[#854d0e] border border-[#fde047]'
                          : 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
