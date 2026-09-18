import React, { useState } from 'react';
import { 
  Printer, 
  Settings, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Check, 
  AlertCircle,
  Sliders,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { printerBrandData } from '../data/initialData';
import { PrinterBrandInfo, PrinterPreset } from '../types';

interface PrinterSettingsViewProps {
  initialBrand?: 'Canon' | 'Epson';
}

export const PrinterSettingsView: React.FC<PrinterSettingsViewProps> = ({
  initialBrand = 'Canon',
}) => {
  const [selectedBrand, setSelectedBrand] = useState<'Canon' | 'Epson'>(initialBrand);
  const [activeSection, setActiveSection] = useState<'presets' | 'maintenance' | 'tips'>('presets');
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);
  const [expandedPresets, setExpandedPresets] = useState<Record<string, boolean>>({});

  const currentBrandData: PrinterBrandInfo = 
    printerBrandData.find((p) => p.brand === selectedBrand) || printerBrandData[0];

  const handleCopyPreset = (preset: PrinterPreset) => {
    const text = `*SETTING CETAK ${selectedBrand.toUpperCase()} - ${preset.title}*
Target: ${preset.targetProduct}
Paper Type: ${preset.paperType}
Quality: ${preset.printQuality}
Color Mode: ${preset.colorMode}
Paper Source: ${preset.paperSource}
DPI: ${preset.recommendedDpi || 'Standard'}
Panduan:
${preset.notes.map((n, i) => `${i + 1}. ${n}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedPresetId(preset.id);
    setTimeout(() => {
      setCopiedPresetId(null);
    }, 1800);
  };

  const togglePreset = (id: string) => {
    setExpandedPresets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50/70 border border-sky-100 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
          <Sliders className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span>Menu B: Setting Print & Cetak</span>
            <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold px-1.5 py-0.2 rounded">
              Sub-Menu Brand
            </span>
          </div>
          <p className="text-slate-500 mt-0.5 leading-relaxed">
            Panduan driver, jenis kertas, dpi, profil warna, dan maintenance mesin untuk hasil cetak maksimal.
          </p>
        </div>
      </div>

      {/* Main Sub-Menu Selector (Canon vs Epson) */}
      <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-1">
        <button
          id="btn-select-canon"
          onClick={() => setSelectedBrand('Canon')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
            selectedBrand === 'Canon'
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-sm shadow-red-200'
              : 'text-slate-600 hover:text-red-600 hover:bg-red-50/50'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>PRINTER CANON</span>
        </button>

        <button
          id="btn-select-epson"
          onClick={() => setSelectedBrand('Epson')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
            selectedBrand === 'Epson'
              ? 'bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-sm shadow-sky-200'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/50'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>PRINTER EPSON</span>
        </button>
      </div>

      {/* Brand Hero Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  selectedBrand === 'Canon' ? 'bg-red-500' : 'bg-sky-500'
                }`}
              />
              <h2 className="text-sm font-bold text-slate-900">
                {currentBrandData.fullName}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Model Umum: {currentBrandData.recommendedModels.slice(0, 2).join(', ')}
            </p>
          </div>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            Driver Setup
          </span>
        </div>

        {/* Characteristics Highlights */}
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
          {currentBrandData.primaryCharacteristics.map((char, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2
                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  selectedBrand === 'Canon' ? 'text-red-500' : 'text-sky-500'
                }`}
              />
              <span>{char}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Tabs: Presets, Maintenance, Tips */}
      <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveSection('presets')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSection === 'presets'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Preset Cetak ({currentBrandData.presets.length})
        </button>
        <button
          onClick={() => setActiveSection('maintenance')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSection === 'maintenance'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Maintenance ({currentBrandData.maintenanceGuides.length})
        </button>
        <button
          onClick={() => setActiveSection('tips')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSection === 'tips'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Tips Operator
        </button>
      </div>

      {/* SECTION 1: PRESET CETAK */}
      {activeSection === 'presets' && (
        <div className="space-y-3">
          {currentBrandData.presets.map((preset) => {
            const isExpanded = expandedPresets[preset.id] !== false; // default open
            const isCopied = copiedPresetId === preset.id;
            return (
              <div
                key={preset.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
              >
                {/* Header card */}
                <div className="p-3.5 border-b border-slate-100 flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        {preset.targetProduct}
                      </span>
                      {preset.recommendedDpi && (
                        <span className="text-[10px] font-medium text-slate-400">
                          {preset.recommendedDpi}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mt-1">
                      {preset.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyPreset(preset)}
                      title="Salin setting untuk operator cetak"
                      className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span className="text-[10px]">{isCopied ? 'Tersalin' : 'Salin'}</span>
                    </button>

                    <button
                      onClick={() => togglePreset(preset.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Preset specs grid */}
                {isExpanded && (
                  <div className="p-3.5 space-y-3 bg-slate-50/40">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Media / Jenis Kertas:
                        </span>
                        <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                          {preset.paperType}
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Kualitas Cetak (Quality):
                        </span>
                        <span className="font-bold text-sky-600 text-xs mt-0.5 block">
                          {preset.printQuality}
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Mode Warna:
                        </span>
                        <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                          {preset.colorMode}
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Posisi Kertas / Tray:
                        </span>
                        <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                          {preset.paperSource}
                        </span>
                      </div>
                    </div>

                    {/* Step by step notes */}
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Instruksi Pengaturan Driver:
                      </span>
                      <ul className="space-y-1">
                        {preset.notes.map((note, nIdx) => (
                          <li
                            key={nIdx}
                            className="text-[11px] text-slate-600 flex items-start gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: MAINTENANCE */}
      {activeSection === 'maintenance' && (
        <div className="space-y-3">
          {currentBrandData.maintenanceGuides.map((guide, gIdx) => (
            <div
              key={gIdx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    {guide.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {guide.summary}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                {guide.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-white border border-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0 text-slate-600">
                      {sIdx + 1}
                    </span>
                    <span className="text-[11px] leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: TIPS OPERATOR */}
      {activeSection === 'tips' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <h3 className="text-xs font-bold text-slate-900">
                Pro-Tips Cetak {selectedBrand}
              </h3>
            </div>

            <div className="space-y-2">
              {currentBrandData.proTips.map((tip, tIdx) => (
                <div
                  key={tIdx}
                  className="p-2.5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span className="text-[11px]">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Paper Dimension Guide */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4">
            <h3 className="text-xs font-bold text-slate-900 mb-2">
              Ukuran Kertas Standar Percetakan
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block">A4 Standar</span>
                <span className="text-slate-500">210 x 297 mm</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block">F4 / Folio</span>
                <span className="text-slate-500">215 x 330 mm</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block">Foto 4R</span>
                <span className="text-slate-500">102 x 152 mm</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block">Polaroid 2R</span>
                <span className="text-slate-500">60 x 90 mm</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
