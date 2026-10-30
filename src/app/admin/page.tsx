'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  Building,
  MapPin,
  Cpu,
  RefreshCw,
  Plus,
  Send,
  Shield,
  Layers,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { EnquiryRecord } from '@/lib/db';

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Fetch enquiries from backend
  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (serviceFilter !== 'ALL') params.set('service', serviceFilter);
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/quote?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, serviceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadEnquiries();
  };

  // Update status via backend PATCH
  const handleStatusChange = async (id: string, newStatus: EnquiryRecord['status']) => {
    try {
      setIsUpdatingStatus(true);
      const res = await fetch('/api/quote', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        const json = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Add internal note via backend PATCH
  const handleAddNote = async (id: string) => {
    if (!newNoteText.trim()) return;

    try {
      const res = await fetch('/api/quote', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          note: {
            author: 'Engineering Lead',
            text: newNoteText.trim(),
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const updated = json.enquiry as EnquiryRecord;
        setEnquiries((prev) => prev.map((e) => (e.id === id ? updated : e)));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(updated);
        }
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  // Export to CSV
  const exportCsv = () => {
    if (enquiries.length === 0) return;

    const headers = [
      'Reference ID',
      'Date',
      'Client Name',
      'Email',
      'Phone',
      'Company',
      'Service Required',
      'Location',
      'Equipment Model',
      'Status',
      'Requirements',
    ];

    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleString('en-IN'),
      `"${e.fullName.replace(/"/g, '""')}"`,
      e.businessEmail,
      e.phoneNumber || '',
      `"${(e.companyName || '').replace(/"/g, '""')}"`,
      `"${e.serviceRequired.replace(/"/g, '""')}"`,
      `"${(e.siteLocation || '').replace(/"/g, '""')}"`,
      `"${(e.equipmentModel || '').replace(/"/g, '""')}"`,
      e.status,
      `"${e.requirementDescription.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eazytech-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'NEW').length,
    reviewing: enquiries.filter((e) => e.status === 'REVIEWING').length,
    quoted: enquiries.filter((e) => e.status === 'QUOTED').length,
  };

  const getStatusBadge = (status: EnquiryRecord['status']) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-cyan-500/10 text-brand-cyan border border-brand-cyan/30">
            NEW
          </span>
        );
      case 'REVIEWING':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            IN REVIEW
          </span>
        );
      case 'QUOTED':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            QUOTED
          </span>
        );
      case 'CLOSED':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-slate-500/10 text-slate-400 border border-slate-500/30">
            CLOSED
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#071321] text-brand-text flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-brand-border bg-brand-secondary/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg bg-brand-card border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-cyan transition-colors"
              title="Return to main website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Logo size="sm" showSubtitle={false} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-cyan px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20">
              Operations & Lead Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-card border border-brand-border text-brand-text hover:border-brand-cyan transition-all"
            >
              <Download className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={loadEnquiries}
              className="p-2 rounded-lg bg-brand-card border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-cyan transition-colors"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-cyan' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-brand-card/90 border border-brand-border flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-brand-muted uppercase">Total Enquiries</span>
              <p className="text-2xl font-black font-mono text-brand-text mt-1">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-brand-secondary border border-brand-border flex items-center justify-center text-brand-cyan">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-card/90 border border-brand-border flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-brand-muted uppercase">New / Unread</span>
              <p className="text-2xl font-black font-mono text-brand-cyan mt-1">{stats.new}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-card/90 border border-brand-border flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-brand-muted uppercase">In Review</span>
              <p className="text-2xl font-black font-mono text-amber-400 mt-1">{stats.reviewing}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-card/90 border border-brand-border flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-brand-muted uppercase">Quoted / Closed</span>
              <p className="text-2xl font-black font-mono text-emerald-400 mt-1">{stats.quoted}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-xl bg-brand-card/70 border border-brand-border flex flex-wrap items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[260px] relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, email, company, or reference ID..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-brand-secondary border border-brand-border text-sm text-brand-text focus:outline-none focus:border-brand-cyan"
            />
          </form>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-brand-muted" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-brand-secondary border border-brand-border text-xs text-brand-text focus:outline-none focus:border-brand-cyan"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="REVIEWING">In Review</option>
                <option value="QUOTED">Quoted</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-brand-secondary border border-brand-border text-xs text-brand-text focus:outline-none focus:border-brand-cyan max-w-[200px]"
            >
              <option value="ALL">All Offerings</option>
              <optgroup label="Products & Solutions">
                <option value="UPS Systems">UPS Systems</option>
                <option value="Batteries">Batteries</option>
                <option value="DC Cables">DC Cables</option>
                <option value="Uninyvin Cables">Uninyvin Cables</option>
                <option value="Miracle Cables">Miracle Cables</option>
                <option value="Battery Link Sets">Battery Link Sets</option>
              </optgroup>
              <optgroup label="Technical Services">
                <option value="Power Audit">Power Audit</option>
                <option value="Load Study">Load Study</option>
                <option value="Battery Impedance Testing">Battery Impedance Testing</option>
                <option value="UPS AMC">UPS AMC</option>
                <option value="UPS Repair">UPS Repair</option>
                <option value="Power Consultancy">Power Consultancy</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Table of Enquiries */}
        <div className="rounded-2xl bg-brand-card/90 border border-brand-border overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-brand-secondary/80 border-b border-brand-border font-mono text-brand-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ref ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/50">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-brand-muted">
                      No quotation enquiries found matching criteria.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="hover:bg-brand-secondary/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedEnquiry(enquiry)}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-cyan">
                        {enquiry.id}
                      </td>
                      <td className="py-3.5 px-4 text-brand-muted font-mono">
                        {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-brand-text">{enquiry.fullName}</div>
                        <div className="text-[11px] text-brand-muted">
                          {enquiry.companyName || enquiry.businessEmail}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-brand-text">
                          {enquiry.serviceRequired}
                        </span>
                        {enquiry.siteLocation && (
                          <div className="text-[11px] text-brand-muted">
                            {enquiry.siteLocation}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(enquiry.status)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnquiry(enquiry);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-secondary border border-brand-border text-brand-text hover:border-brand-cyan hover:text-brand-cyan transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Selected Enquiry Detailed Drawer / Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEnquiry(null)}
          />

          <div className="relative w-full max-w-xl h-full bg-brand-secondary border-l border-brand-border p-6 sm:p-8 overflow-y-auto flex flex-col justify-between z-10 shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-brand-cyan">
                      {selectedEnquiry.id}
                    </span>
                    {getStatusBadge(selectedEnquiry.status)}
                  </div>
                  <h3 className="text-xl font-bold text-brand-text mt-1">
                    {selectedEnquiry.fullName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 rounded-lg text-brand-muted hover:text-brand-text bg-brand-card border border-brand-border"
                >
                  ✕
                </button>
              </div>

              {/* Status Update Control */}
              <div className="p-4 rounded-xl bg-brand-card border border-brand-border flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-brand-muted">Update Stage:</span>
                <div className="flex items-center gap-2">
                  {(['NEW', 'REVIEWING', 'QUOTED', 'CLOSED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-all ${
                        selectedEnquiry.status === st
                          ? 'bg-brand-cyan text-[#071321] font-bold border-brand-cyan shadow-cyan-glow-sm'
                          : 'bg-brand-secondary text-brand-muted hover:text-brand-text border-brand-border'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="p-4 rounded-xl bg-brand-card/70 border border-brand-border space-y-3 text-xs">
                <div className="flex items-center gap-2 text-brand-muted">
                  <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                  <a
                    href={`mailto:${selectedEnquiry.businessEmail}`}
                    className="text-brand-text hover:text-brand-cyan underline"
                  >
                    {selectedEnquiry.businessEmail}
                  </a>
                </div>
                {selectedEnquiry.phoneNumber && (
                  <div className="flex items-center gap-2 text-brand-muted">
                    <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                    <a
                      href={`tel:${selectedEnquiry.phoneNumber}`}
                      className="text-brand-text hover:text-brand-cyan font-mono"
                    >
                      {selectedEnquiry.phoneNumber}
                    </a>
                  </div>
                )}
                {selectedEnquiry.companyName && (
                  <div className="flex items-center gap-2 text-brand-muted">
                    <Building className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="text-brand-text">{selectedEnquiry.companyName}</span>
                  </div>
                )}
                {selectedEnquiry.siteLocation && (
                  <div className="flex items-center gap-2 text-brand-muted">
                    <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="text-brand-text">{selectedEnquiry.siteLocation}</span>
                  </div>
                )}
              </div>

              {/* Technical Scope & Specifications */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider">
                  Requested Service & Equipment
                </h4>
                <div className="p-4 rounded-xl bg-brand-card border border-brand-border space-y-2">
                  <div className="text-sm font-bold text-brand-text">
                    {selectedEnquiry.serviceRequired}
                  </div>
                  {selectedEnquiry.equipmentModel && (
                    <div className="flex items-center gap-2 text-xs text-brand-muted">
                      <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>{selectedEnquiry.equipmentModel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider">
                  Requirement Details:
                </h4>
                <div className="p-4 rounded-xl bg-brand-bg border border-brand-border text-xs text-brand-text leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.requirementDescription}
                </div>
              </div>

              {/* Internal Engineering Notes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider">
                  Internal Notes & History
                </h4>
                {selectedEnquiry.notes.length === 0 ? (
                  <p className="text-xs text-brand-muted italic">No internal notes added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedEnquiry.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-brand-card border border-brand-border/60 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted">
                          <span className="text-brand-cyan font-bold">{note.author}</span>
                          <span>{new Date(note.date).toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-brand-text">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Note Input */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add engineering action note..."
                    className="flex-1 px-3 py-2 rounded-lg bg-brand-card border border-brand-border text-xs text-brand-text focus:outline-none focus:border-brand-cyan"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNote(selectedEnquiry.id);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddNote(selectedEnquiry.id)}
                    className="px-3.5 py-2 rounded-lg bg-brand-cyan text-[#071321] hover:bg-brand-cyan-hover font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Add</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-brand-border flex items-center justify-between">
              <span className="text-[10px] font-mono text-brand-muted">
                Source IP: {selectedEnquiry.sourceIp || '127.0.0.1'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-brand-card border border-brand-border text-brand-text hover:border-brand-cyan"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
