import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-itsa-navy-dark text-white py-6 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="ITSA Logo" 
                width={40} 
                height={40} 
                className="rounded-full bg-white object-contain shrink-0"
              />
              <p className="text-white/80 font-medium text-sm text-left">
                Information Technology Students Association<br/>
                <span className="text-white/60">University of Professional Studies, Accra.</span>
              </p>
            </div>
          </div>
          
          <div className="text-sm text-white/50 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} ITSA-UPSA. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
