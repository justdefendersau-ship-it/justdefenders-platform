/*
Timestamp: 7 March 2026 — 20:56
File: /app/components/ToastProvider.tsx

Purpose:
Provide global toast notification system
for the JustDefenders platform.
*/

"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Toast {

 id: number
 message: string

}

interface ToastContextType {

 addToast: (message:string)=>void

}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast(){

 const ctx = useContext(ToastContext)

 if(!ctx){
  throw new Error("useToast must be used within ToastProvider")
 }

 return ctx

}

export default function ToastProvider({ children }:{ children:ReactNode }){

 const [toasts,setToasts] = useState<Toast[]>([])

 function addToast(message:string){

  const id = Date.now()

  setToasts(prev=>[
   ...prev,
   { id,message }
  ])

  setTimeout(()=>{

   setToasts(prev=>prev.filter(t=>t.id !== id))

  },4000)

 }

 return(

 <ToastContext.Provider value={{ addToast }}>

  {children}

  <div className="fixed bottom-6 right-6 space-y-3 z-50">

   {toasts.map(t=>(

    <div
     key={t.id}
     className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-neutral-700"
    >
     {t.message}
    </div>

   ))}

  </div>

 </ToastContext.Provider>

 )

}