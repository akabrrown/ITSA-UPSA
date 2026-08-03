'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import Image from 'next/image';

export interface UploadedFile {
  url: string;
  original_filename: string;
}

interface CloudinaryUploadProps {
  onUpload?: (url: string) => void;
  onUploadMultiple?: (files: UploadedFile[]) => void;
  defaultValue?: string;
  folder?: string;
  label?: string;
  isPdf?: boolean;
  multiple?: boolean;
}

export function CloudinaryUpload({ 
  onUpload, 
  onUploadMultiple, 
  defaultValue, 
  folder = 'itsa', 
  label = 'Upload Media', 
  isPdf = false,
  multiple = false 
}: CloudinaryUploadProps) {
  const [url, setUrl] = useState<string>(defaultValue || '');
  const [files, setFiles] = useState<UploadedFile[]>([]);

  return (
    <div className="space-y-3">
      {/* Single Mode Display */}
      {!multiple && url && !isPdf && (
        <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <Image src={url} alt="Uploaded media" fill className="object-cover" />
        </div>
      )}
      {!multiple && url && isPdf && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          File uploaded successfully: {url.split('/').pop()}
        </div>
      )}

      {/* Multiple Mode Display */}
      {multiple && files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <span className="truncate">{file.original_filename}</span>
            </div>
          ))}
          <p className="text-xs text-gray-500 font-medium">{files.length} files queued</p>
        </div>
      )}
      
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "department"}
        options={{
          folder: folder,
          maxFiles: multiple ? 50 : 1,
          clientAllowedFormats: isPdf ? ['pdf', 'doc', 'docx', 'ppt', 'pptx'] : ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        }}
        onSuccess={(result: any) => {
          if (result.info && result.info.secure_url) {
            const newFile = {
              url: result.info.secure_url,
              original_filename: result.info.original_filename || 'Unknown File'
            };
            
            if (multiple) {
              setFiles(prev => {
                const updated = [...prev, newFile];
                if (onUploadMultiple) onUploadMultiple(updated);
                return updated;
              });
            } else {
              setUrl(newFile.url);
              if (onUpload) onUpload(newFile.url);
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <button 
              type="button" 
              onClick={() => open()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-itsa-navy"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              {(multiple && files.length > 0) ? 'Add More Files' : (url ? 'Change File' : label)}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
