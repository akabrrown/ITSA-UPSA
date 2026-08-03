import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const isAdminSubdomain = hostname.startsWith('admin.');
  
  let currentPath = request.nextUrl.pathname;
  let isRewriting = false;

  // If accessed via admin.domain, rewrite paths to /admin implicitly
  // Exception: /auth routes (like signout) which sit at the root
  if (isAdminSubdomain && !currentPath.startsWith('/admin') && !currentPath.startsWith('/auth')) {
    currentPath = `/admin${currentPath === '/' ? '' : currentPath}`;
    isRewriting = true;
  }

  let supabaseResponse = isRewriting
    ? NextResponse.rewrite(new URL(currentPath, request.url), { request })
    : NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = isRewriting
            ? NextResponse.rewrite(new URL(currentPath, request.url), { request })
            : NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /admin routes (using currentPath to account for rewrites)
  if (currentPath.startsWith('/admin') && !currentPath.startsWith('/admin/login')) {
    if (!user) {
      // no user, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = isAdminSubdomain ? '/login' : '/admin/login';
      return NextResponse.redirect(url);
    }

    // Force password change check
    const requiresPasswordChange = user.user_metadata?.requires_password_change;
    if (requiresPasswordChange && !currentPath.startsWith('/admin/change-password')) {
      const url = request.nextUrl.clone();
      url.pathname = isAdminSubdomain ? '/change-password' : '/admin/change-password';
      return NextResponse.redirect(url);
    }
  }

  // If user is logged in and tries to access login page, redirect to dashboard or change password
  if (currentPath.startsWith('/admin/login')) {
    if (user) {
      const requiresPasswordChange = user.user_metadata?.requires_password_change;
      const url = request.nextUrl.clone();
      
      if (requiresPasswordChange) {
        url.pathname = isAdminSubdomain ? '/change-password' : '/admin/change-password';
      } else {
        url.pathname = isAdminSubdomain ? '/dashboard' : '/admin/dashboard';
      }
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse
}
