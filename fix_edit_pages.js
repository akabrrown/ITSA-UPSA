const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/admin/dashboard/news/[id]/page.tsx',
  'src/app/admin/dashboard/speech/[id]/page.tsx',
  'src/app/admin/dashboard/tutorials/[id]/page.tsx',
  'src/app/admin/dashboard/banners/[id]/page.tsx',
  'src/app/admin/dashboard/department-info/[id]/page.tsx',
  'src/app/admin/dashboard/authorities/[id]/page.tsx'
];

for (const file of filesToFix) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has 'use client' in the middle
    if (content.includes(`'use client';`) && !content.startsWith(`'use client';`)) {
      // It has the pattern we need to fix
      
      // Determine what Form it imports
      const formImportMatch = content.match(/import\s+\{\s*([A-Za-z0-9_]+Form)\s*\}\s+from\s+'[^']+';/);
      const formComponent = formImportMatch ? formImportMatch[1] : null;
      const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
      const title = titleMatch ? titleMatch[1] : 'Edit Record';
      const descMatch = content.match(/<p[^>]*>([^<]+)<\/p>/);
      const desc = descMatch ? descMatch[1] : 'Update the details below.';
      
      // Determine table name from supabase.from('...')
      const tableMatch = content.match(/supabase\.from\('([^']+)'\)/);
      const tableName = tableMatch ? tableMatch[1] : null;
      
      if (formComponent && tableName) {
        const newContent = `'use client';

import { useEffect, useState, use } from 'react';
import { ${formComponent} } from "@/components/admin/${formComponent}";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: res } = await supabase.from('${tableName}').select('*').eq('id', resolvedParams.id).single();
      if (res) setData(res);
      setLoading(false);
    };
    fetchData();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading data...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Record not found.</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">${title}</h1>
        <p className="text-sm text-gray-500 mt-1">${desc}</p>
      </div>
      <${formComponent} initialData={data} />
    </div>
  );
}
`;
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed ${file}`);
      } else {
        console.log(`Could not extract required data from ${file}`);
      }
    } else {
      console.log(`Skipped ${file} - no internal 'use client'`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
