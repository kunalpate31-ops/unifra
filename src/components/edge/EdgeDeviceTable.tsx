import React from 'react';
import { EdgeDevice } from '../../types/edge';
import {
  Cpu,
  Server,
  Radio,
  Eye,
  Wifi,
  Layers,
  MapPin
} from 'lucide-react';

interface EdgeDeviceTableProps {
  devices: EdgeDevice[];
  onSelectDevice: (device: EdgeDevice) => void;
}

export const EdgeDeviceTable: React.FC<EdgeDeviceTableProps> = ({
  devices,
  onSelectDevice
}) => {
  const getDeviceTypeIcon = (type: EdgeDevice['deviceType']) => {
    switch (type) {
      case 'Edge Gateway':
        return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
      case 'IoT Gateway':
        return <Wifi className="w-3.5 h-3.5 text-amber-400" />;
      case 'Industrial Controller':
        return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Raspberry Pi Gateway':
        return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Edge Server':
        return <Server className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Cpu className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: EdgeDevice['status']) => {
    switch (status) {
      case 'Online':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Online
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Warning
          </span>
        );
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-950">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            Critical
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            Offline
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-lg space-y-3.5">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-semibold text-white tracking-wide">
              EDGE DEVICE INVENTORY
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Distributed edge nodes, firmware telemetry, sensor buses & operational status
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Device ID</th>
              <th className="py-2.5 px-3 font-semibold">Device Name</th>
              <th className="py-2.5 px-3 font-semibold">Location</th>
              <th className="py-2.5 px-3 font-semibold">Device Type</th>
              <th className="py-2.5 px-3 font-semibold">CPU</th>
              <th className="py-2.5 px-3 font-semibold">Memory</th>
              <th className="py-2.5 px-3 font-semibold">Temperature</th>
              <th className="py-2.5 px-3 font-semibold">Network</th>
              <th className="py-2.5 px-3 font-semibold">Uptime</th>
              <th className="py-2.5 px-3 font-semibold">Status</th>
              <th className="py-2.5 px-3 font-semibold">Last Seen</th>
              <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/30 font-mono">
            {devices.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-8 text-center text-slate-500 font-mono text-xs">
                  No edge devices found matching the specified filters.
                </td>
              </tr>
            ) : (
              devices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => onSelectDevice(device)}
                  className={`hover:bg-slate-800/40 transition-colors cursor-pointer group ${
                    device.id === 'EDGE-003' ? 'bg-rose-950/10' : ''
                  }`}
                >
                  {/* Device ID */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-slate-800/80 border border-slate-700/60">
                        {getDeviceTypeIcon(device.deviceType)}
                      </span>
                      <span
                        className={`font-bold font-mono ${
                          device.id === 'EDGE-003'
                            ? 'text-rose-400 font-black'
                            : 'text-white group-hover:text-cyan-300'
                        } transition-colors`}
                      >
                        {device.id}
                      </span>
                    </div>
                  </td>

                  {/* Device Name */}
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-200">{device.name}</span>
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {device.ipAddress}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {device.location}
                    </span>
                  </td>

                  {/* Device Type */}
                  <td className="py-2.5 px-3 text-slate-300 text-[11px] whitespace-nowrap">
                    {device.deviceType}
                  </td>

                  {/* CPU */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-bold ${
                        device.cpu > 85
                          ? 'text-rose-400'
                          : device.cpu > 70
                          ? 'text-amber-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      {device.cpu}%
                    </span>
                  </td>

                  {/* Memory */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-bold ${
                        device.memory > 80
                          ? 'text-rose-400'
                          : device.memory > 65
                          ? 'text-amber-400'
                          : 'text-indigo-300'
                      }`}
                    >
                      {device.memory}%
                    </span>
                  </td>

                  {/* Temperature */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-bold ${
                        device.temperature > 75
                          ? 'text-rose-400 animate-pulse font-extrabold'
                          : device.temperature > 65
                          ? 'text-amber-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {device.temperature}°C
                    </span>
                  </td>

                  {/* Network */}
                  <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                    <span
                      className={
                        device.networkStatus === 'degraded'
                          ? 'text-rose-400 font-bold'
                          : 'text-slate-300'
                      }
                    >
                      {device.network}
                    </span>
                  </td>

                  {/* Uptime */}
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {device.uptime}
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-3 font-sans whitespace-nowrap">{getStatusBadge(device.status)}</td>

                  {/* Last Seen */}
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {device.lastSeen}
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onSelectDevice(device)}
                        title="View Device Telemetry & Alerts"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[10px]"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
