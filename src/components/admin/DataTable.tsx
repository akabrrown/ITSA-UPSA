'use client';

import Link from 'next/link';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  createLink?: string;
  createText?: string;
  onDelete?: (id: string) => void;
  editLinkPrefix?: string;
}

export function DataTable<T extends { id: string }>({
  title,
  description,
  data,
  columns,
  createLink,
  createText = 'Add New',
  onDelete,
  editLinkPrefix,
}: DataTableProps<T>) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        {createLink && (
          <Link 
            href={createLink}
            className="inline-flex items-center justify-center px-4 py-2 bg-itsa-navy text-white text-sm font-medium rounded-lg hover:bg-itsa-navy-dark transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            {createText}
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4">{col.header}</th>
                ))}
                {(editLinkPrefix || onDelete) && (
                  <th className="px-6 py-4 text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    {columns.map((col, i) => (
                      <td key={i} className="px-6 py-4 text-gray-700">
                        {typeof col.accessor === 'function' 
                          ? col.accessor(item) 
                          : (item[col.accessor] as React.ReactNode)}
                      </td>
                    ))}
                    {(editLinkPrefix || onDelete) && (
                      <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                        {editLinkPrefix && (
                          <Link 
                            href={`${editLinkPrefix}/${item.id}`}
                            className="text-itsa-navy font-medium hover:text-itsa-gold transition-colors inline-flex items-center"
                          >
                            Edit
                          </Link>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => {
                              if(window.confirm('Are you sure you want to delete this record? This cannot be undone.')) {
                                onDelete(item.id);
                              }
                            }}
                            className="text-red-500 font-medium hover:text-red-700 transition-colors inline-flex items-center"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
