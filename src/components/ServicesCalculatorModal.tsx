import React, { useEffect, useMemo, useState } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';

type ServiceType = 'design' | 'development' | 'both';
type TimelineType = 'normal' | 'fast' | 'rush';

interface ServicesCalculatorModalProps {
  open: boolean;
  onClose: () => void;
  brandName?: string;
}

const SERVICE_PRICING: Record<ServiceType, { base: number; perPage: number }> = {
  design: { base: 100, perPage: 30 },
  development: { base: 150, perPage: 40 },
  both: { base: 250, perPage: 60 },
};

const WHATSAPP_NUMBER = '5492616648128';

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  design: 'Solo Diseno',
  development: 'Solo Desarrollo',
  both: 'Diseno + Desarrollo',
};

const TIMELINE_LABELS: Record<TimelineType, string> = {
  rush: 'En 7 Dias',
  fast: 'En 14 Dias',
  normal: 'Velocidad Normal',
};

const formatPrice = (value: number) => `$${value.toLocaleString()}`;

const calculatePrice = ({
  serviceType,
  pages,
  needContent,
  needSEO,
  timeline,
}: {
  serviceType: ServiceType;
  pages: number;
  needContent: boolean;
  needSEO: boolean;
  timeline: TimelineType;
}) => {
  const { base, perPage } = SERVICE_PRICING[serviceType];
  let total = base + (pages - 1) * perPage;

  if (needContent) total += pages * 15;
  if (needSEO) total += pages * 20;
  if (timeline === 'rush') total += pages * 30;
  if (timeline === 'fast') total += pages * 10;

  return total;
};

const calculateAgencyCost = (serviceType: ServiceType, pages: number) => {
  if (serviceType === 'both') {
    return 1500 + (pages - 1) * 150;
  }
  return 800 + (pages - 1) * 80;
};

const calculateFreelancerCost = (serviceType: ServiceType, pages: number) => {
  if (serviceType === 'both') {
    return 600 + (pages - 1) * 80;
  }
  return 350 + (pages - 1) * 40;
};

export const ServicesCalculatorModal: React.FC<ServicesCalculatorModalProps> = ({
  open,
  onClose,
  brandName = 'Geronimo Guevara',
}) => {
  const [serviceType, setServiceType] = useState<ServiceType>('both');
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<TimelineType>('normal');

  const estimatedPrice = useMemo(
    () =>
      calculatePrice({
        serviceType,
        pages,
        needContent,
        needSEO,
        timeline,
      }),
    [serviceType, pages, needContent, needSEO, timeline]
  );

  const agencyCost = useMemo(() => calculateAgencyCost(serviceType, pages), [serviceType, pages]);

  const freelancerCost = useMemo(() => calculateFreelancerCost(serviceType, pages), [serviceType, pages]);

  const whatsappMessage = useMemo(() => {
    return [
      `Hola ${brandName}, me interesa saber sobre los costos para una pagina web.`,
      '',
      'Complete la calculadora con estos datos:',
      `- Servicio: ${SERVICE_TYPE_LABELS[serviceType]}`,
      `- Paginas: ${pages}`,
      `- Ayuda con contenido: ${needContent ? 'Si' : 'No'}`,
      `- SEO: ${needSEO ? 'Si' : 'No'}`,
      `- Entrega: ${TIMELINE_LABELS[timeline]}`,
      '',
      'Resultados presupuestados:',
      `- Con ${brandName}: ${formatPrice(estimatedPrice)}`,
      `- Agencia tipica: ${formatPrice(agencyCost)}`,
      `- Freelancer regular: ${formatPrice(freelancerCost)}`,
      '',
      'Quiero avanzar con este proyecto. Quedo atento.',
    ].join('\n');
  }, [brandName, serviceType, pages, needContent, needSEO, timeline, estimatedPrice, agencyCost, freelancerCost]);

  const whatsappUrl = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
    [whatsappMessage]
  );

  const sliderProgress = ((pages - 1) / 29) * 100;

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousLeft = document.body.style.left;
    const previousRight = document.body.style.right;
    const previousWidth = document.body.style.width;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.left = previousLeft;
      document.body.style.right = previousRight;
      document.body.style.width = previousWidth;
      window.removeEventListener('keydown', handleKeyDown);
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/90 p-4 md:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-hidden="true"
    >
      <div className="flex min-h-full items-start justify-center py-4 lg:items-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Calculadora de servicios"
          className="w-full max-w-7xl overflow-hidden rounded-2xl border border-[#0C1A2B] bg-black"
        >
          <header className="relative border-b border-white/10 bg-black px-8 pb-8 pt-16 lg:px-12">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-white/30 hover:bg-white/5"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="max-w-3xl text-3xl font-normal text-white md:text-4xl">
              Obten un sitio web premium dentro de tu presupuesto
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-black p-8 lg:p-12">
              <div className="divide-y divide-white/10">
                <section className="pb-6">
                  <h3 className="mb-4 text-lg text-white">Que tipo de servicio necesitas?</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Solo Diseno', value: 'design' as const },
                      { label: 'Solo Desarrollo', value: 'development' as const },
                      { label: 'Diseno + Desarrollo', value: 'both' as const },
                    ].map((option) => {
                      const isActive = serviceType === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setServiceType(option.value)}
                          className={`flex w-full items-center rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            isActive
                              ? 'border-[#0C1A2B] bg-[#0C1A2B]/10 text-white'
                              : 'border-white/10 bg-black text-white/80 hover:border-white/20'
                          }`}
                        >
                          <span
                            className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
                              isActive ? 'border-[#0C1A2B]' : 'border-white/20'
                            }`}
                          >
                            {isActive ? <span className="h-2.5 w-2.5 rounded-full bg-white" /> : null}
                          </span>
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="py-6">
                  <h3 className="mb-4 text-lg text-white">Cantidad de paginas: {pages}</h3>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={pages}
                    onChange={(event) => setPages(Number(event.target.value))}
                    className="service-slider w-full"
                    style={{
                      background: `linear-gradient(90deg, #0C1A2B 0%, #0C1A2B ${sliderProgress}%, rgba(255,255,255,0.16) ${sliderProgress}%, rgba(255,255,255,0.16) 100%)`,
                    }}
                  />
                  <div className="mt-2 flex justify-between text-xs text-white/60">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </section>

                <section className="py-6">
                  <h3 className="mb-4 text-lg text-white">Extras</h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: 'Necesito ayuda con el contenido',
                        priceLabel: '+$15/pagina',
                        checked: needContent,
                        onToggle: () => setNeedContent((current) => !current),
                      },
                      {
                        label: 'Quiero optimizar mi web para SEO',
                        priceLabel: '+$20/pagina',
                        checked: needSEO,
                        onToggle: () => setNeedSEO((current) => !current),
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={item.onToggle}
                        className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left text-sm text-white/90 transition-colors hover:border-white/20"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded border ${
                              item.checked ? 'border-[#0C1A2B] bg-[#0C1A2B]' : 'border-white/20 bg-black'
                            }`}
                          >
                            {item.checked ? <Check className="h-3.5 w-3.5 text-white" /> : null}
                          </span>
                          {item.label}
                        </span>
                        <span className="text-white/70">{item.priceLabel}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="pt-6">
                  <h3 className="mb-4 text-lg text-white">Que tan rapido lo necesitas?</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'En 7 Dias', value: 'rush' as const, extra: '+$30/pagina' },
                      { label: 'En 14 Dias', value: 'fast' as const, extra: '+$10/pagina' },
                      { label: 'Velocidad Normal', value: 'normal' as const, extra: 'Sin costo extra' },
                    ].map((option) => {
                      const isActive = timeline === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setTimeline(option.value)}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            isActive
                              ? 'border-[#0C1A2B] bg-[#0C1A2B]/10 text-white'
                              : 'border-white/10 bg-black text-white/80 hover:border-white/20'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                isActive ? 'border-[#0C1A2B]' : 'border-white/20'
                              }`}
                            >
                              {isActive ? <span className="h-2.5 w-2.5 rounded-full bg-white" /> : null}
                            </span>
                            {option.label}
                          </span>
                          <span className="text-white/70">{option.extra}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>

            <div className="bg-[#0C1A2B] p-8 lg:p-12">
              <h3 className="text-2xl text-white">Costo Estimado</h3>
              <p className="mt-2 text-sm text-white/70">
                Ajusta las opciones para ver una comparativa realista entre mercado tradicional y un servicio premium
                optimizado.
              </p>

              <div className="mt-8 space-y-4">
                <article className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-sm text-white/70">Una agencia tipica cobra al menos</p>
                  <p className="text-4xl text-white">{formatPrice(agencyCost)}</p>
                  <p className="text-sm text-white/60">+ Mucho tiempo extra y costos ocultos</p>
                </article>

                <article className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-6">
                  <p className="text-sm text-white/70">Un freelancer regular cobra al menos</p>
                  <p className="text-4xl text-white">{formatPrice(freelancerCost)}</p>
                  <p className="text-sm text-white/60">+ Muchos dolores de cabeza y demoras</p>
                </article>

                <article className="space-y-3 rounded-2xl border border-white/20 bg-black p-6">
                  <p className="text-sm text-white/80">Con {brandName}</p>
                  <p className="text-5xl font-bold text-white">{formatPrice(estimatedPrice)}</p>
                  <p className="text-sm text-white/70">Ahorra dinero, tiempo y dolores de cabeza</p>
                </article>

                <div className="space-y-4 rounded-2xl border border-white/20 bg-black/30 p-6">
                  <p className="text-sm text-white/85">
                    Si a tu negocio le falta una pagina web o estas buscando este tipo de servicios, contactame por
                    WhatsApp y lo vemos juntos.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#0C1A2B] bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0C1A2B]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
