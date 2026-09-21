export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Dev World Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-screen bg-paper-soft">{children}</div>;
}
