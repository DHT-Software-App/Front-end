import React, { useState } from 'react'
// icons
import { Folder, PictureAsPdf, PhotoAlbum, ArrowRight } from '@mui/icons-material';
import { Document } from 'types/Document';

type DocumentTableProps = {
  documents: Document[]
}

export default function DocumentTable() {

  const [dropRow, setDropRow] = useState(false);

  return (
    <div className='overflow-x-auto w-full'>
      <div className="mx-auto w-full whitespace-nowrap flex flex-col tracking-wide overflow-hidden">
        <header className="bg-slate-100 text-sm text-slate-500 grid grid-cols-5 font-bold uppercase border-b-2 border-slate-200">
          <span className='px-4 py-3 flex items-center'>
            <Folder className='mx-3' color='inherit' fontSize='small' />
            name
          </span>
          <span className='px-6 py-3 flex items-center'>customer</span>
          <span className='px-6 py-3 flex items-center'>type</span>
          <span className='px-6 py-3 flex items-center'>address</span>
          <span className='px-6 py-3 flex items-center justify-end'>modified</span>
        </header>
        <section className='pb-3 divide-y divide-slate-200'>

          <div className="document-row 
          text-base font-medium grid grid-cols-5 text-slate-600 
           hover:shadow duration-200">
            <span className='pr-6 py-3 flex items-center'>
              <ArrowRight className={`mr-1 cursor-pointer ${dropRow && 'rotate-90'}`}
                color='inherit'
                fontSize='small'
                onClick={() => setDropRow(!dropRow)} />
              <PhotoAlbum className='mr-3' color='inherit' fontSize='small' />
              Photos
            </span>
            <span className='px-6 py-3 flex items-center'>Luis R. Fernandez</span>
            <span className='px-6 py-3 flex items-center'>TARP</span>
            <span className='px-6 py-3 flex items-center'>123 Main Str, New York, NY 10030</span>
            <span className='px-6 py-3 flex items-center justify-end'>Last modification at 2018-05-01</span>

            <div className={`divide-y divide-slate-200  col-span-full py-2 px-5 ${dropRow || 'hidden'} overflow-hidden duration-200`}>
              <div className='grid grid-cols-5'>
                <span className='px-4 py-3 col-span-1 flex items-center'>
                  <img
                    src="https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2021/04/Mold-Remediation-Cost.jpg"
                    className='h-7 w-7 mx-3 rounded-sm cursor-pointer opacity-100 hover:opacity-75 duration-200'
                  />

                  10842320320012.jpg

                </span>
                <span className='px-2 py-3 col-span-3 flex items-center'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit aliquid consectetur,
                </span>
                <span className='px-2 py-3 col-span-1 flex items-center justify-end font-bold'>12:15 a.m.</span>
              </div>

              <div className='grid grid-cols-5'>
                <span className='px-4 py-3 col-span-1 flex items-center'>
                  <img
                    src="https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2021/04/Mold-Remediation-Cost.jpg"
                    className='h-7 w-7 mx-3 rounded-sm cursor-pointer opacity-100 hover:opacity-75 duration-200'
                  />

                  10842320320012.jpg

                </span>
                <span className='px-2 py-3 col-span-3 flex items-center'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit aliquid consectetur,
                </span>
                <span className='px-2 py-3 col-span-1 flex items-center justify-end font-bold'>12:15 a.m.</span>
              </div>
            </div>
          </div>

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



        </section>
      </div>
    </div >
  )
}
