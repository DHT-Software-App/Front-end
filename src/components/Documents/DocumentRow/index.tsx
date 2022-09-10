import React, { ReactNode } from 'react'
import { Folder, PictureAsPdf, PhotoAlbum, ArrowRight } from '@mui/icons-material';
import { Document } from 'types/Document';

type DocumentRowProps = {
  icon: ReactNode,
  document: Document
}

export default function DocumentRow() {
  return (
    <div className="document-row 
    text-base font-medium grid grid-cols-5 text-slate-600 
     hover:shadow duration-200">
      <span className='px-4 py-3 flex items-center'>
        <PictureAsPdf className='mx-3' color='inherit' fontSize='small' />
        Photos
      </span>
      <span className='px-6 py-3 flex items-center'>Luis R. Fernandez</span>
      <span className='px-6 py-3 flex items-center'>TARP</span>
      <span className='px-6 py-3 flex items-center'>123 Main Str, New York, NY 10030</span>
      <span className='px-6 py-3 flex items-center justify-end'>Last modification at 2018-05-01</span>
    </div>
  )
}
