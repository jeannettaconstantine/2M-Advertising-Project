import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, 
  Send, CheckCircle2, ShieldCheck, HelpCircle, ChevronDown 
} from 'lucide-react';
import { Language } from '../types';
import { AmbientBackground } from './AmbientBackground';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isId = lang === 'id';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    service: 'Neonbox',
    location: 'Bandar Lampung',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo 2M Advertising (Est. 2002), saya mengajukan permintaan survei & konsultasi:%0A%0A` +
      `• Nama: ${formData.name}%0A` +
      `• Brand/Perusahaan: ${formData.company || '-' }%0A` +
      `• No. WhatsApp: ${formData.phone}%0A` +
      `• Layanan: ${formData.service}%0A` +
      `• Lokasi: ${formData.location}%0A` +
      `• Kebutuhan: ${formData.notes || 'Mohon jadwal survei lokasi dan penawaran'}`;
    
    window.open(`https://wa.me/62811721596?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const faqs = [
    {
      q: isId ? 'Berapa lama proses pembuatan neonbox atau plang toko?' : 'How long does neonbox or signboard production take?',
      a: isId
        ? 'Untuk neonbox dan signboard standar ruko berkisar 5 hingga 10 hari kerja setelah desain disetujui. Untuk proyek monumental seperti Pylon Sign hotel atau tiang billboard berkisar 14 hingga 25 hari kerja termasuk pembuatan pondasi beton.'
        : 'Standard retail neonboxes and signboards typically take 5 to 10 business days upon design sign-off. Monumental pylon towers take 14 to 25 business days including reinforced civil foundation curing.',
    },
    {
      q: isId ? 'Apakah 2M Advertising melayani pengurusan pajak reklame?' : 'Does 2M Advertising handle the municipal advertising tax and permits?',
      a: isId
        ? 'Ya, tentu! Sejak tahun 2002, kami memiliki tim legal khusus yang bermitra resmi dengan BPPRD / Bapenda Kota Bandar Lampung dan Pemda setempat. Kami mengurus izin titik (SIPR), penetapan nilai sewa (NSR), hingga stiker lunas pajak resmi agar reklame Anda 100% aman dari pembongkaran Satpol PP.'
        : 'Yes, absolutely. Since 2002, our in-house permitting department coordinates directly with municipal tax agencies (BPPRD) to secure legitimate decrees (SKPD) and zoning approvals, protecting your investment from illegal takedown risks.',
    },
    {
      q: isId ? 'Apakah melayani pemesanan ke luar kota Bandar Lampung?' : 'Do you execute projects outside Bandar Lampung?',
      a: isId
        ? 'Sangat sering! Kami telah memasang lebih dari 10.000 proyek yang tersebar di seluruh Provinsi Lampung (Metro, Kalianda, Kotabumi, Tulang Bawang), Sumatera Selatan (Palembang, Prabumulih), Bengkulu, Jambi, hingga proyek tol dan pulau Jawa.'
        : 'Very frequently. We have installed over 10,000 projects across Lampung, South Sumatera (Palembang), Bengkulu, Jambi, highway corridors, and Java.',
    },
    {
      q: isId ? 'Apakah ada garansi untuk lampu & konstruksi?' : 'Is there an official structural and electrical warranty?',
      a: isId
        ? 'Semua produk reklame kami disertai garansi untuk kerusakan konstruksi rangka dan lampu'
        : 'All signage produced by 2M Advertising comes with an official warranty covering frame structural defects and lighting.',
    },
  ];

  return (
    <section id="contact-section" className="py-20 bg-gradient-to-b from-slate-100 via-[#f8fafc] to-slate-100 border-b border-slate-200 text-slate-900 relative overflow-hidden">
      {/* Ambient color transitions background */}
      <AmbientBackground intensity="vibrant" theme="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <a
            href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20dan%20survei%20lokasi%20gratis%20untuk%20reklame%20brand%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-blue-600 shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{isId ? 'Konsultasi & Survei Lokasi Gratis' : 'Consultation & Site Survey'}</span>
          </a>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight uppercase">
            {isId ? (
              <>
                Siap Meningkatkan Visibilitas{' '}
                <span className="text-blue-600">
                  Brand Bisnis Anda?
                </span>
              </>
            ) : (
              <>
                Ready to Amplify Your{' '}
                <span className="text-blue-600">
                  Brand Presence?
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isId
              ? 'Diskusikan kebutuhan reklame outdoor, indoor, pengurusan pajak daerah, atau konsultasi strategi brand Anda bersama tim spesialis kami.'
              : 'Discuss your OOH advertising, indoor signage, municipal tax permits, or brand strategy with our dedicated specialists.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20dan%20survei%20lokasi%20gratis%20untuk%20reklame%20brand%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>{isId ? 'KONSULTASI & SURVEI LOKASI GRATIS' : 'FREE CONSULTATION & SITE SURVEY'}</span>
            </a>
          </div>
        </div>

        {/* 2-Columns: Contact Info & Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm text-slate-900">
              <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>2M Advertising</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-blue-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isId ? 'Kantor Pusat:' : 'Headquarters:'}
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      Jl. Arif Rahman Hakim No.25A, Tj. Baru, Kec. Kedamaian, Kota Bandar Lampung, Lampung 35122
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-emerald-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isId ? 'Hotline Konsultasi & Whatsapp:' : 'Hotline & WhatsApp:'}
                    </span>
                    <a href="https://wa.me/62811721596" className="text-emerald-600 font-bold hover:underline block">
                      +62811-721-596
                    </a>
                    <span className="text-slate-500 text-[11px] block mt-0.5">
                      Telp Kantor: (0721) 771-389
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-sky-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Email:
                    </span>
                    <a href="mailto:advertising.2m@gmail.com" className="text-slate-600 hover:text-blue-600">
                      advertising.2m@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-purple-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isId ? 'Jam Operasional:' : 'Operating Hours:'}
                    </span>
                    <span className="text-slate-600 block">
                      Senin – Sabtu: 08:00 – 17:00 WIB
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp Banner */}
              <div className="pt-2">
                <a
                  href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20langsung%20pembuatan%20reklame"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isId ? 'Chat WhatsApp Langsung (Fast Response)' : 'Instant WhatsApp Response'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-slate-900">
            <h3 className="text-lg font-bold text-slate-950 mb-2">
              {isId ? 'Formulir Permintaan Penawaran & Survei Lapangan' : 'Request Official Quotation & Site Survey'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {isId
                ? 'Isi formulir berikut dan spesifikasi Anda akan langsung terhubung ke WhatsApp pimpinan estimasi kami.'
                : 'Complete this form to dispatch your specifications directly to our senior project estimators.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isId ? 'Nama Lengkap *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isId ? 'Cth: Budi Santoso' : 'e.g. John Doe'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isId ? 'Nama Perusahaan / Brand' : 'Company / Brand Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={isId ? 'Cth: PT Sinar Abadi / Toko Baru' : 'e.g. Acme Corp'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isId ? 'Nomor WhatsApp *' : 'WhatsApp Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812-XXXX-XXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isId ? 'Jenis Kebutuhan' : 'Service Needed'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Neonbox Acrylic/Backlit">Neonbox Acrylic/Backlit</option>
                    <option value="Pylon Sign / Totem Tower">Pylon Sign / Totem Tower</option>
                    <option value="Huruf Timbul 3D (Stainless/Akrilik)">Huruf Timbul 3D</option>
                    <option value="Signboard Toko / Fascia">Signboard Toko / Fascia</option>
                    <option value="Billboard / Rangka Luar Ruang">Billboard / Rangka Luar Ruang</option>
                    <option value="Indoor Wayfinding & Akrilik">Indoor Wayfinding & Akrilik</option>
                    <option value="Custom LED Neon Flex">Custom LED Neon Flex</option>
                    <option value="Store Branding & Booth Mall">Store Branding & Booth Mall</option>
                    <option value="Pengurusan Pajak Reklame Saja">Pengurusan Pajak Reklame Saja</option>
                    <option value="Digital Ads & Strategy (Waitlist)">Digital Ads & Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isId ? 'Kota Pemasangan' : 'Installation City'}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bandar Lampung / Metro..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isId ? 'Rincian Ukuran / Catatan Tambahan' : 'Dimensions & Project Notes'}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isId ? 'Contoh: Ukuran perkiraan 4x1.2 meter, pasang di lantai 2, butuh survei titik...' : 'e.g. Approx 4x1.2m, 2nd floor, need site survey...'}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{isId ? 'Kirim Permintaan & Buka WhatsApp' : 'Dispatch via WhatsApp'}</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isId ? 'Pesan disiapkan! Tim estimasi kami siap melayani Anda.' : 'Message prepared! Our estimator is ready to assist.'}
                  </span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-950 flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>FAQ</span>
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
