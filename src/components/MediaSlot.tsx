import type { Slot } from '../media';

interface MediaSlotProps {
  slot: Slot;
  className?: string;
  /** Clases del <img>/<video> cuando sí hay archivo. */
  mediaClassName?: string;
  video?: boolean;
}

/**
 * Muestra la foto o el video si ya está cargado en /public; si no, deja un
 * recuadro con el nombre de archivo que hay que poner. Así la página se puede
 * revisar completa antes de tener el material definitivo.
 */
export default function MediaSlot({
  slot,
  className = '',
  mediaClassName = 'absolute inset-0 h-full w-full object-cover',
  video = false,
}: MediaSlotProps) {
  if (slot.src) {
    return video ? (
      <video
        src={slot.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={slot.alt}
        className={`${mediaClassName} ${className}`}
      />
    ) : (
      <img src={slot.src} alt={slot.alt} loading="lazy" className={`${mediaClassName} ${className}`} />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/20 bg-ink/[0.03] p-6 text-center ${className}`}
    >
      <i className={`bi ${video ? 'bi-camera-video' : 'bi-image'} text-[22px] text-ink/25`} />
      <p className="text-[12px] text-ink/40">Falta {video ? 'el video' : 'la foto'}</p>
      <code className="rounded bg-ink/5 px-2 py-1 text-[11px] text-ink/50">
        public/{slot.sugerido}
      </code>
    </div>
  );
}
