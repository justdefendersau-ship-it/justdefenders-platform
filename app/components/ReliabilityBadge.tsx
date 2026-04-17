// Timestamp: 11 March 2026 23:28
// Reliability Badge Component

export default function ReliabilityBadge({score}:{score:number}){

 let color="bg-gray-400"

 if(score>85) color="bg-green-500"
 else if(score>70) color="bg-yellow-500"
 else color="bg-red-500"

 return(

  <div className={`${color} text-white px-3 py-1 rounded-full text-sm`}>
   Reliability {score}
  </div>

 )

}