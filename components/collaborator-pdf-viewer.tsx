'use client';

import { useState } from 'react';
import { FileText, X } from 'lucide-react';

const pdfUrl = '/Messages%20from%20Collaborators.pdf';

export function CollaboratorPdfViewer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/50 bg-[#7A0C0C] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7A0C0C]/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#4A0808] focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 dark:border-[#B08D57]/60 dark:bg-[#B08D57] dark:text-[#1C1C1C]"
          aria-label="Open messages from collaborators PDF"
        >
          <FileText className="h-4 w-4" />
          View Messages from Collaborators
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#D9D0C7] bg-white shadow-2xl dark:border-[#B08D57]/40 dark:bg-[#1C1C1C]">
            <div className="flex items-center justify-between border-b border-[#D9D0C7] px-4 py-3 dark:border-[#B08D57]/30">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#4A0808] dark:text-[#F8F5F3]">
                <FileText className="h-4 w-4 text-[#B08D57]" />
                Messages from Collaborators
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9D0C7] text-[#4A0808] transition-colors hover:bg-[#F8F5F3] focus:outline-none focus:ring-2 focus:ring-[#B08D57] dark:border-[#B08D57]/40 dark:text-[#F8F5F3] dark:hover:bg-[#2B2B2B]"
                aria-label="Close PDF viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 bg-[#F8F5F3] p-3 dark:bg-[#1C1C1C]">
              <iframe
                src={pdfUrl}
                title="Messages from Collaborators"
                className="h-[75vh] w-full rounded-xl border-0 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
