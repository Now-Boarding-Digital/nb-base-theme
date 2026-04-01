/**
 * Social / auth login button (design-system control)
 * Wide buttons for social login (Google, Apple, etc.) or default
 */
export type LoginButtonProvider = 'google' | 'apple' | 'facebook' | 'default';

export interface LoginButtonProps {
  provider?: LoginButtonProvider;
  label?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const providerLabels: Record<LoginButtonProvider, string> = {
  google: 'Continue with Google',
  apple: 'Continue with Apple',
  facebook: 'Continue with Facebook',
  default: 'Continue with Email',
};

const providerClasses: Record<LoginButtonProvider, string> = {
  google:
    '[--color-login-bg:var(--color-login-google-bg)] [--color-login-text:var(--color-login-google-text)] [--color-login-border:var(--color-login-google-border)] [--color-login-hover-bg:var(--color-login-google-hover-bg)] [--color-login-hover-border:var(--color-login-google-hover-border)]',
  apple:
    '[--color-login-bg:var(--color-login-apple-bg)] [--color-login-text:var(--color-login-apple-text)] [--color-login-border:var(--color-login-apple-border)] [--color-login-hover-bg:var(--color-login-apple-hover-bg)] [--color-login-hover-border:var(--color-login-apple-hover-border)]',
  facebook:
    '[--color-login-bg:var(--color-login-facebook-bg)] [--color-login-text:var(--color-login-facebook-text)] [--color-login-border:var(--color-login-facebook-border)] [--color-login-hover-bg:var(--color-login-facebook-hover-bg)] [--color-login-hover-border:var(--color-login-facebook-hover-border)]',
  default:
    '[--color-login-bg:var(--color-login-default-bg)] [--color-login-text:var(--color-login-default-text)] [--color-login-border:var(--color-login-default-border)] [--color-login-hover-bg:var(--color-login-default-hover-bg)] [--color-login-hover-border:var(--color-login-default-hover-border)]',
};

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M19.8 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
    <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
    <path d="M4.405 11.91a5.997 5.997 0 010-3.827V5.491H1.064A9.996 9.996 0 000 10c0 1.605.386 3.123 1.064 4.509l3.34-2.59z" fill="#FBBC05" />
    <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959 1.09 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.49l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="M16.5 10.5c-.03-2.5 2.04-3.7 2.13-3.75-1.16-1.73-2.96-2.15-3.6-2.18-1.54-.16-2.94.91-3.7.91-.77 0-1.94-.88-3.19-.86-1.64.03-3.15.95-4.01 2.42-1.71 2.97-1.44 7.37 1.23 12.23.8 1.18 1.72 2.5 2.89 2.46 1.14-.05 1.57-.75 2.95-.75 1.37 0 1.75.75 2.94.72 1.21-.03 1.98-1.2 2.77-2.38.87-1.27 1.23-2.5 1.25-2.56-.03-.02-2.4-.92-2.43-3.66zM13.2 4.7c1.42-1.08 2.38-2.58 2.41-4.17-2.33.09-5.15 1.55-6.86 3.53-1.32 1.53-2.47 3.97-2.15 6.32 2.55.2 4.12-1.27 5.6-2.68z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.99 20 10z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2" y="4" width="16" height="12" rx="1" />
    <path d="M2 6l8 5 8-5" />
  </svg>
);

const providerIcons: Record<LoginButtonProvider, React.ReactNode> = {
  google: <GoogleIcon />,
  apple: <AppleIcon />,
  facebook: <FacebookIcon />,
  default: <EmailIcon />,
};

export function LoginButton({
  provider = 'google',
  label,
  disabled = false,
  className = '',
  onClick,
}: LoginButtonProps) {
  return (
    <button
      type="button"
      className={[
        'w-full max-w-[398px] min-w-[280px] h-14 px-6 flex items-center justify-center gap-3 font-bold text-base leading-6 rounded-[var(--radius-control-large)] border cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-[var(--color-login-bg)] text-[var(--color-login-text)] border-[var(--color-login-border)]',
        'hover:bg-[var(--color-login-hover-bg)] hover:border-[var(--color-login-hover-border)]',
        'disabled:hover:bg-[var(--color-login-bg)] disabled:hover:border-[var(--color-login-border)]',
        providerClasses[provider],
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex items-center justify-center shrink-0">{providerIcons[provider]}</span>
      {label ?? providerLabels[provider]}
    </button>
  );
}
