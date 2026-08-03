import { LoginForm } from "@/components/admin/LoginForm";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <Image 
            src="/logo.png" 
            alt="ITSA Logo" 
            width={64} 
            height={64} 
            className="rounded-full bg-white object-contain mx-auto mb-4"
          />
          <h1 className="text-2xl font-heading font-bold text-itsa-navy">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in with your executive credentials.</p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-itsa-navy transition-colors">
            &larr; Back to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
