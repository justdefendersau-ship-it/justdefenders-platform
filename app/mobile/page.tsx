/* Timestamp: 12 March 2026 22:10 */
/* Mobile Companion Dashboard */

import MobileDiagnosticPanel from "@/app/components/mobile/MobileDiagnosticPanel"

export default function MobilePage(){

 return(

  <div className="p-4 space-y-4">

   <h1 className="text-xl font-semibold text-white">
    JustDefenders Mobile
   </h1>

   <MobileDiagnosticPanel/>

  </div>

 )

}