import React from 'react';
import { Hammer, ShieldCheck, Cpu, Wrench, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { AnimatedCounter } from './AnimatedCounter';

interface WorkshopQualityProps {
  lang: Language;
}

export const WorkshopQuality: React.FC<WorkshopQualityProps> = ({ lang }) => {
  const isId = lang === 'id';

  const capabilities = [
    {
      number: '01',
      title: isId ? 'Dibuat dengan Presisi' : 'Built with Precision',
      subtitle: isId ? 'Hasil Rapi, Detail, dan Berkualitas' : 'Neat, Detailed & High Quality Results',
      desc: isId
        ? 'Setiap signage kami dibuat dengan proses produksi yang presisi, menghasilkan potongan yang rapi, detail yang tajam, dan finishing yang membuat tampilan brand terlihat profesional.'
        : 'Each of our signs is crafted through a high-precision manufacturing process, producing clean cuts, sharp details, and a finish that makes your brand look truly professional.',
      icon: Cpu,
      badge: isId ? 'Presisi Produksi · Finishing Berkualitas' : 'Production Precision · Quality Finishing',
    },
    {
      number: '02',
      title: isId ? 'Kokoh untuk Jangka Panjang' : 'Built for the Long Run',
      subtitle: isId ? 'Dibuat untuk Berdiri dan Bertahan' : 'Constructed to Stand & Endure',
      desc: isId
        ? 'Mulai dari rangka hingga detail akhir, setiap konstruksi dibuat dengan material berkualitas dan pengerjaan yang teliti agar signage tetap kokoh, aman, dan tampil baik dalam jangka panjang.'
        : 'From structural framing to the finest finish, every construction uses quality materials and meticulous craftsmanship to ensure the signage stays sturdy, secure, and looking prime for years.',
      icon: Hammer,
      badge: isId ? 'Konstruksi Kuat · Pengerjaan Berpengalaman' : 'Rigid Structure · Experienced Craftsmanship',
    },
    {
      number: '03',
      title: isId ? 'Ada Garansi, Lebih Tenang' : 'Warrantied, Total Peace of Mind',
      subtitle: isId ? 'Kualitas yang Kami Berani Jamin' : 'Quality We Confidently Stand Behind',
      desc: isId
        ? 'Kami percaya pekerjaan yang baik harus disertai dengan tanggung jawab. Karena itu, konstruksi dan kelistrikan signage kami dilengkapi garansi (S&K berlaku) untuk memberikan ketenangan setelah pemasangan.'
        : 'We believe good work must come with full accountability. That is why our signage structure and electrical components include a warranty (T&C apply) to give you complete peace of mind post-installation.',
      icon: ShieldCheck,
      badge: isId ? 'Garansi (S&K berlaku) · Dukungan Purna Jual' : 'Warranty (T&C apply) · After-Sales Support',
    },
    {
      number: '04',
      title: isId ? 'Siap Membantu Saat Dibutuhkan' : 'Ready When You Need Us',
      subtitle: isId ? 'Signage Bermasalah? Kami Siap Datang.' : 'Signage Issue? We Stand Ready.',
      desc: isId
        ? 'Ketika lampu mati atau signage mengalami kerusakan, tim kami siap merespons dan melakukan perbaikan langsung di lokasi di wilayah Lampung—agar bisnis Anda bisa kembali terlihat tanpa menunggu terlalu lama.'
        : 'When lights malfunction or signage experiences damage, our team responds promptly and conducts on-site repairs across Lampung—getting your business back in the spotlight without delay.',
      icon: Clock,
      badge: isId ? 'Respon Cepat · Perbaikan di Lokasi' : 'Fast Response · On-Site Repair',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-blue-600 shadow-sm">
            <Wrench className="w-3.5 h-3.5" />
            <span>{isId ? 'Fabrikasi Langsung Tanpa Perantara' : 'Direct Manufacturer Craftsmanship'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight uppercase">
            {isId ? (
              <>
                Mengapa <AnimatedCounter end={300} suffix="+" /> Brand Nasional{' '}
                <span className="text-blue-600">
                  Memilih 2M Advertising?
                </span>
              </>
            ) : (
              <>
                Why <AnimatedCounter end={300} suffix="+" /> Corporate Brands{' '}
                <span className="text-blue-600">
                  Choose 2M Advertising?
                </span>
              </>
            )}
          </h2>

          <div className="space-y-3 max-w-2xl mx-auto text-left sm:text-center">
            <p className="text-lg sm:text-xl font-bold italic text-slate-950 leading-relaxed">
              {isId
                ? '“Karena kualitas dimulai dari cara pekerjaan dibuat”'
                : '“Because quality begins with how the work is crafted”'}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isId
                ? 'Selama lebih dari dua dekade, 2M Advertising mengerjakan setiap proyek langsung dari workshop kami di Bandar Lampung—didukung mesin produksi sendiri, material berkualitas, dan tim teknisi berpengalaman. Dari detail pertama hingga instalasi terakhir, kami menjaga setiap proses agar hasil akhirnya sesuai dengan standar yang kami janjikan.'
                : 'For more than two decades, 2M Advertising has executed every project directly from our workshop in Bandar Lampung—powered by in-house production machinery, premium materials, and an experienced technical crew. From the very first detail to the final installation, we safeguard every process so the finished result meets the standards we promise.'}
            </p>
          </div>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group shadow-sm text-slate-900"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {item.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-blue-600 mt-0.5">
                    {item.subtitle}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 font-semibold shrink-0" />
                <span className="font-medium">{item.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Territory Availability / Installation Coverage Banner */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
              {isId ? 'Cakupan Layanan' : 'Service Coverage'}
            </span>
            <h3 className="text-xl font-black text-slate-950">
              {isId
                ? 'Pemasangan & Maintenance ke seluruh daerah di Lampung, Sumatera, dan Jawa'
                : 'Installation & Maintenance Across Lampung, Sumatra, and Java'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isId
                ? 'Didukung dengan tim teknisi yang handal, 2M Advertising siap membantu anda di seluruh lokasi di Provinsi Lampung, Sumatera (Bengkulu, Jambi, Palembang, Padang, dll), dan JABODETABEK'
                : 'Backed by an experienced technical team, 2M Advertising is ready to serve you across Lampung Province, Sumatra (Bengkulu, Jambi, Palembang, Padang, etc.), and JABODETABEK.'}
            </p>
          </div>

          <a
            href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20layanan%20pembuatan%20dan%20pemasangan%20reklame"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>{isId ? 'Konsultasi Sekarang via Whatsapp' : 'Consult Now via WhatsApp'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
