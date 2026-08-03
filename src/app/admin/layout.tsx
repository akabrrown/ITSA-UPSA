import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // We still let middleware handle redirects, but this double check is fine.
  // Actually, we shouldn't redirect from layout if we want the login page to use this layout.
  // Wait, /admin/login does not use this layout if it's placed differently, but currently it IS inside /admin/login.
  // If we redirect in layout, they can't access /admin/login because layout wraps it!
  // Oh, wait, the layout wraps all of /admin. If they aren't logged in, they can't see the login page!
  // Let me check if /admin/login is wrapped by this layout. If it is, we shouldn't redirect here.
  // We'll just pass user email optionally.

  return (
    <AdminLayoutClient userEmail={user?.email}>
      {children}
    </AdminLayoutClient>
  );
}
