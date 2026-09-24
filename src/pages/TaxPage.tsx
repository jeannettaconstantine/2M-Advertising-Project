import React, { useEffect } from 'react';
import { Language } from '../types';
import { TaxPermitGuide } from '../components/TaxPermitGuide';
import { CostEstimator } from '../components/CostEstimator';
import {
  ShieldCheck,
  FileCheck,
  Scale,
  ArrowLeft,
  Calculator,
  MessageCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface TaxPageProps {
  lang: Language;
  onBackToHome: () => void;
}

export const TaxPage: React.FC<TaxPageProps> = ({ lang, onBackToHome }) => {
  const isId = lang === 'id';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen relative overflow-hidden">
      
      {/* Top Header / Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isId ? 'Kembali ke Beranda Utama' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => scrollToSection('tax-calculator')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold border border-slate-800 hidden sm:inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span>{isId ? 'Kalkulator Estimasi' : 'Cost Estimator'}</span>
            </button>
            <button
              onClick={() => scrollToSection('tax-guide')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold border border-slate-800 hidden sm:inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5 text-red-400" />
              <span>{isId ? 'Risiko & Izin SIPR' : 'Risks & Permits'}</span>
            </button>
            <a
              href="https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20bantuan%20pengurusan%20pajak%20reklame%20dan%20izin%20SIPR"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isId ? 'Konsultasi Legalitas' : 'Legal Consultation'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tax Page Hero */}
      <section className="py-14 sm:py-18 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-[#070e24] to-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>
              {isId
                ? 'Pusat Layanan Pajak & Izin Reklame Resmi (SIPR / SKPD BPPRD)'
                : 'Official Municipal Advertising Tax & Legal Permitting Center'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            {isId ? (
              <>
                Pengurusan Pajak & Izin Reklame{' '}
                <span className="text-blue-400">
                  100% Legal & Bebas Razia
                </span>
              </>
            ) : (
              <>
                Official Signage Tax Permitting &{' '}
                <span className="text-blue-400">
                  Zero Enforcement Risk
                </span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isId
              ? 'Sejak tahun 2002, 2M Advertising dipercaya menjadi mitra legalitas reklame terkemuka di Kota Bandar Lampung dan Provinsi Lampung. Kami mengurus Surat Izin Penyelenggaraan Reklame (SIPR), rekomendasi Dishub & Tata Ruang, penetapan NSR resmi di BPPRD, hingga stiker lunas pajak.'
              : 'Since 2002, 2M Advertising has served as the leading licensed signage permit contractor in Bandar Lampung. We handle municipal zoning (SIPR), transportation clearances, official tax decrees (SKPD), and official tax seals.'}
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 text-left max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {isId ? 'Bebas Pembongkaran Satpol PP' : 'Zero Confiscation Risk'}
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isId
                  ? 'Legalitas lengkap terdaftar resmi di Bapenda & BPPRD dengan SKPD sah.'
                  : 'Fully compliant registration with formal municipal revenue tax decrees.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {isId ? 'Proses Terpadu Cepat' : 'Expedited Handling'}
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isId
                  ? 'Tim internal bergerak cepat dari survei sempadan hingga stiker terbit.'
                  : 'In-house legal team manages technical drawings to tax clearance stickers.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {isId ? 'Transparan Sesuai Perda' : 'Transparent Municipal NSR'}
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isId
                  ? 'Perhitungan NSR akurat sesuai klasifikasi kelas jalan (Protokol/Kolektor).'
                  : 'Calculated transparently based on statutory street class regulations.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 1: Interactive Cost Estimator (Directly Embedded Dropdown) */}
      <div id="tax-calculator">
        <CostEstimator lang={lang} />
      </div>

      {/* Part 2: Interactive Real Risk Guide (No Tax Calculator) */}
      <div id="tax-guide">
        <TaxPermitGuide
          lang={lang}
          onOpenEstimator={() => scrollToSection('tax-calculator')}
        />
      </div>

      {/* Bottom Legal Support CTA Banner */}
      <section className="py-14 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3.5">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isId
              ? 'Punya Reklame yang Sudah Terpasang tapi Belum Berizin?'
              : 'Already Have Existing Signage Lacking Official Permits?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isId
              ? 'Jangan tunggu sampai mendapatkan surat peringatan (SP) atau penyegelan Satpol PP. Tim legal 2M Advertising siap membantu proses pemutihan dan perpanjangan izin SIPR Anda.'
              : 'Avoid municipal warning letters or confiscation notices. Our legal team assists with regularizing and renewing your signage licenses immediately.'}
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20bantuan%20legalitas%20dan%20pajak%20reklame"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/40 transition-transform hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{isId ? 'Konsultasi Tim Legal Pajak (WhatsApp)' : 'Contact Legal Tax Team (WhatsApp)'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
