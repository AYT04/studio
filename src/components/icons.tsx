export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="M9.5 12 15 8.5v7L9.5 12z" fill="currentColor" stroke="none" />
    <path d="M2 9h20M2 15h20" />
  </svg>
);
