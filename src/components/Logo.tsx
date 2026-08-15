interface LogoProps {
  className?: string;
  size?: number;
}

/** Marca mínima: la diadema como arco y las dos copas como círculos. */
export default function Logo({ className, size = 18 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3.6 14.5v-2.9a8.4 8.4 0 0 1 16.8 0v2.9" />
      <rect x="1.9" y="13.6" width="4.6" height="7.2" rx="2.3" />
      <rect x="17.5" y="13.6" width="4.6" height="7.2" rx="2.3" />
      <circle cx="4.2" cy="17.2" r="1.1" />
      <circle cx="19.8" cy="17.2" r="1.1" />
    </svg>
  );
}
