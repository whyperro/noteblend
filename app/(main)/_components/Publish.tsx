'use client';
import { Doc } from '@/convex/_generated/dataModel';
import {PopoverTrigger, Popover, PopoverContent} from '@/components/ui/popover'
import React, { useState } from 'react'
import { useOrigin } from '@/hooks/use-origin';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Check, Copy, EyeOff, Globe } from 'lucide-react';


interface PublishProps {
  initialData: Doc<'documents'>;
}

const Publish = ({initialData}: PublishProps) => {

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const origin = useOrigin()
  const update = useMutation(api.documents.update);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    })
    .finally(() => setIsSubmitting(false));

    toast.promise(promise,{
      loading: "Publicando nota...",
      success: "¡Nota publicada!",
      error: "Error al publicar la nota"
    })
  }

  const onUnpublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    })
    .finally(() => setIsSubmitting(false));

    toast.promise(promise,{
      loading: "Ocultando nota...",
      success: "¡Nota ocultada!",
      error: "Error al ocultar la nota"
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'sm'} variant={'ghost'}>
          Publicar 
          {initialData.isPublished && (
            <Globe className='text-sky-500 w-4 h-4 ml-2'/>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
          {initialData.isPublished ? (
            <div className='space-y-4'>
              <div className='flex items-center gap-x-2'>
                <Globe className='text-sky-500 animate-pulse h-4 w-4' />
                <p className='text-sm font-medium text-sky-500'>
                  ¡Tu nota está publicada!
                </p>
              </div>
              <div className='flex items-center'>
                <input value={url} className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate' disabled />
                <Button onClick={onCopy} disabled={copied} className='h-8 rounded-l-none'>
                  {copied ? (<Check className='h-4 w-4' />) : (<Copy className='h-4 w-4' />)}
                </Button>
              </div>
              <Button className='flex gap-1 w-full text-xs' onClick={onUnpublish} disabled={isSubmitting}>
                Ocultar 
                <EyeOff className='w-4 h-4'/>
              </Button>
            </div>
          ): (
            
            <div className='flex flex-col items-center justify-center'>
            <Globe className='h-8 w-8 text-muted-foreground mb-2'/>
            <p className='text-sm font-medium mb-2'>Publica esta nota</p>
            <p className='text-xs text-muted-foreground mb-4'>¡Comparte tus notas con el mundo!</p>
            <Button disabled={isSubmitting} onClick={onPublish} className='w-full text-xs' size={'sm'}>
              Publicar
            </Button>
          </div>
          )}
      </PopoverContent>
    </Popover>
  )
}

export default Publish