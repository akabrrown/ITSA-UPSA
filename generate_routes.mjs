import fs from 'fs/promises';
import path from 'path';

const basePath = './src/app/admin/dashboard';

const configs = [
  {
    folder: 'tutorials',
    table: 'tutorials',
    type: 'Tutorial',
    title: 'Tutorials',
    formComponent: 'TutorialForm'
  },
  {
    folder: 'news',
    table: 'news_posts',
    type: 'NewsPost',
    title: 'News & Posts',
    formComponent: 'NewsForm'
  },
  {
    folder: 'authorities',
    table: 'department_authorities',
    type: 'DepartmentAuthority',
    title: 'Department Authorities',
    formComponent: 'AuthorityForm'
  },
  {
    folder: 'banners',
    table: 'banner_slides',
    type: 'BannerSlide',
    title: 'Banner Slides',
    formComponent: 'BannerForm'
  },
  {
    folder: 'speech',
    table: 'president_speech',
    type: 'PresidentSpeech',
    title: 'President Speech',
    formComponent: 'SpeechForm'
  },
  {
    folder: 'department-info',
    table: 'department_info',
    type: 'DepartmentInfo',
    title: 'Department Info',
    formComponent: 'DepartmentInfoForm'
  }
];

async function generate() {
  for (const config of configs) {
    const dir = path.join(basePath, config.folder);
    const newDir = path.join(dir, 'new');
    const idDir = path.join(dir, '[id]');
    
    await fs.mkdir(newDir, { recursive: true });
    await fs.mkdir(idDir, { recursive: true });

    // page.tsx (List View)
    let columnsDef = `[
    { header: 'Title/Name', accessor: 'title' as const },
  ]`;
    if (config.folder === 'authorities' || config.folder === 'speech') {
        columnsDef = `[
    { header: 'Name', accessor: 'name' as const },
    { header: 'Title', accessor: 'title' as const },
  ]`;
    }
    if (config.folder === 'authorities') {
        columnsDef = `[
    { header: 'Name', accessor: 'full_name' as const },
    { header: 'Title', accessor: 'title' as const },
  ]`;
    }
    if (config.folder === 'banners') {
        columnsDef = `[
    { header: 'Headline', accessor: 'headline' as const },
    { header: 'Status', accessor: ((item: any) => item.is_active ? 'Active' : 'Hidden') as const },
  ]`;
    }
    if (config.folder === 'department-info') {
        columnsDef = `[
    { header: 'ID', accessor: 'id' as const },
  ]`;
    }
    if (config.folder === 'news') {
        columnsDef = `[
    { header: 'Title', accessor: 'title' as const },
    { header: 'Status', accessor: ((item: any) => item.is_published ? 'Published' : 'Draft') as const },
  ]`;
    }

    const pageContent = `import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { deleteRecord } from '@/lib/admin-actions';
import { createClient } from '@supabase/supabase-js';
import { ${config.type} } from '@/lib/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ${config.type}Page() {
  const [data, setData] = useState<${config.type}[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: res } = await supabase.from('${config.table}').select('*').order('created_at', { ascending: false }).limit(100);
    if (res) setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this?')) {
      await deleteRecord('${config.table}', id, '/admin/dashboard/${config.folder}');
      fetchData();
    }
  };

  const columns = ${columnsDef};

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">${config.title}</h1>
        <Link 
          href="/admin/dashboard/${config.folder}/new" 
          className="px-4 py-2 bg-itsa-navy text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable 
          data={data} 
          columns={columns} 
          onDelete={handleDelete}
          editBasePath="/admin/dashboard/${config.folder}"
        />
      </div>
    </div>
  );
}`;

    // new/page.tsx
    const newPageContent = `import { ${config.formComponent} } from '@/components/admin/${config.formComponent}';

export default function New${config.type}Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New ${config.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below.</p>
      </div>
      <${config.formComponent} />
    </div>
  );
}`;

    // [id]/page.tsx
    const idPageContent = `import { use } from 'react';
import { ${config.formComponent} } from '@/components/admin/${config.formComponent}';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Edit${config.type}Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit ${config.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Update the details below.</p>
      </div>
      
      {/* Client component to fetch data and render form */}
      <DataFetcher id={resolvedParams.id} />
    </div>
  );
}

// Client wrapper to fetch the data
'use client';
import { useState, useEffect } from 'react';
import { ${config.type} } from '@/lib/types';

function DataFetcher({ id }: { id: string }) {
  const [data, setData] = useState<${config.type} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: res } = await supabase.from('${config.table}').select('*').eq('id', id).single();
      if (res) setData(res);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="py-12 text-center text-gray-500">Loading data...</div>;
  if (!data) return <div className="py-12 text-center text-red-500">Record not found.</div>;

  return <${config.formComponent} initialData={data} />;
}
`;

    // Overwriting if necessary
    try {
        await fs.writeFile(path.join(dir, 'page.tsx'), pageContent);
        await fs.writeFile(path.join(newDir, 'page.tsx'), newPageContent);
        await fs.writeFile(path.join(idDir, 'page.tsx'), idPageContent);
    } catch (err) {
        console.error(err);
    }
  }
}

generate().then(() => console.log('Done')).catch(console.error);
