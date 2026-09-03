"use client";

import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Bell, Plus, Trash2, Power, RefreshCw, Check, AlertCircle } from 'lucide-react';

interface AlertItem {
  id: string;
  targetGpu: string;
  maxPrice: number;
  slackWebhookUrl: string;
  active: boolean;
  createdAt: string;
}

const POPULAR_GPUS = ['H100 SXM5', 'H100 PCIe', 'A100 80GB', 'A100 40GB', 'L40S', 'RTX 4090', 'GH200', 'B200'];

export default function AlertsDashboardPage() {
  const { data: session, status } = useSession();
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [targetGpu, setTargetGpu] = useState('H100 SXM5');
  const [maxPrice, setMaxPrice] = useState('2.50');
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('');

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/alerts');
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts || []);
      }
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAlerts();
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [session, status]);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!slackWebhookUrl.startsWith('https://hooks.slack.com/')) {
      setError('Slack Webhook URL must start with https://hooks.slack.com/');
      return;
    }

    try {
      setCreating(true);
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetGpu,
          maxPrice: parseFloat(maxPrice),
          slackWebhookUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create alert');
      }

      setSuccessMsg('Alert successfully registered! Dispatching webhook heartbeat.');
      setSlackWebhookUrl('');
      fetchAlerts();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id: string, currentActive: boolean) => {
    try {
      // Optimistic update
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !currentActive } : a));

      const res = await fetch('/api/alerts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentActive }),
      });

      if (!res.ok) {
        // Revert on error
        fetchAlerts();
      }
    } catch (err) {
      console.error('Failed to toggle alert:', err);
      fetchAlerts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alert rule?')) return;

    try {
      setAlerts(prev => prev.filter(a => a.id !== id));
      await fetch(`/api/alerts?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete alert:', err);
      fetchAlerts();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center gap-3 text-sm text-[#888]">
          <RefreshCw className="animate-spin text-green-500" size={18} />
          Loading active alert triggers & Slack webhook policies...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto py-16 text-center border border-[#1f1f1f] bg-[#0f0f0f] rounded-2xl p-8">
        <Bell className="mx-auto text-[#666] mb-3" size={32} />
        <h2 className="text-lg font-bold text-white mb-2">Sign In Required</h2>
        <p className="text-xs text-[#888] mb-6 leading-relaxed">
          Connect your account to monitor global GPU spot drops and broadcast inventory webhooks to Slack.
        </p>
        <button
          onClick={() => signIn('google')}
          className="w-full py-2.5 px-4 bg-white text-black font-semibold text-xs rounded-xl hover:bg-gray-200 transition-all"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Alert Creator Card */}
      <div className="p-6 rounded-2xl bg-[#111] border border-[#222]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell size={16} className="text-green-500" />
              Create Global Inventory Alert Rule
            </h2>
            <p className="text-xs text-[#888] mt-1">
              When any indexed provider (Lambda, RunPod, PrimeIntellect, Nebius, etc.) offers a GPU under your target price, an automated alert drops into your Slack channel.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-2">
            <Check size={14} className="shrink-0" />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleCreateAlert} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1.5">
              Target GPU Model
            </label>
            <select
              value={targetGpu}
              onChange={(e) => setTargetGpu(e.target.value)}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors"
            >
              {POPULAR_GPUS.map((gpu) => (
                <option key={gpu} value={gpu}>{gpu}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1.5">
              Max Desired Price ($/hr)
            </label>
            <input
              type="number"
              step="0.05"
              min="0.10"
              max="50.00"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              required
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
              placeholder="e.g. 2.49"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1.5">
              Slack Webhook URL
            </label>
            <input
              type="url"
              value={slackWebhookUrl}
              onChange={(e) => setSlackWebhookUrl(e.target.value)}
              required
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-green-500 transition-colors font-mono"
              placeholder="https://hooks.slack.com/services/..."
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={creating}
              className="w-full py-2 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {creating ? <RefreshCw size={13} className="animate-spin" /> : <Plus size={14} />}
              Add Alert Rule
            </button>
          </div>
        </form>
      </div>

      {/* Active Rules List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#888] uppercase tracking-wider">
            Registered Alert Triggers ({alerts.length})
          </h3>
          <button
            onClick={fetchAlerts}
            className="text-[11px] text-[#666] hover:text-white flex items-center gap-1 transition-colors"
          >
            <RefreshCw size={11} /> Refresh
          </button>
        </div>

        {alerts.length === 0 ? (
          <div className="py-12 border border-dashed border-[#222] rounded-2xl text-center bg-[#0d0d0d]">
            <Bell size={24} className="mx-auto text-[#444] mb-2" />
            <p className="text-xs text-[#777]">No active alerts configured yet.</p>
            <p className="text-[11px] text-[#555] mt-0.5">Create an alert rule above to get notified as soon as GPUs free up.</p>
          </div>
        ) : (
          <div className="border border-[#1f1f1f] rounded-2xl bg-[#0f0f0f] overflow-hidden divide-y divide-[#1a1a1a]">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#141414] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(alert.id, alert.active)}
                    title={alert.active ? 'Disable Alert' : 'Enable Alert'}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${alert.active ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-[#1f1f1f] text-[#666] border-[#333]'}`}
                  >
                    <Power size={14} />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{alert.targetGpu}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1f1f1f] text-green-400 border border-[#2a2a2a]">
                        ≤ ${alert.maxPrice.toFixed(2)}/hr
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${alert.active ? 'bg-green-500/10 text-green-400' : 'bg-[#222] text-[#666]'}`}>
                        {alert.active ? 'Live Monitoring' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#555] font-mono truncate max-w-md mt-1">
                      Target: {alert.slackWebhookUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[10px] text-[#444] font-mono mr-2">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#666] hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-all"
                    title="Delete Alert"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
