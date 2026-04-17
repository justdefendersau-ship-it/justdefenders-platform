// Timestamp: 13 March 2026 00:08
// Vehicle Image Browser for Parts Finder

export default function VehicleImageBrowser() {

 return (

  <div>

   <h1 className="text-2xl font-bold mb-8">
    Vehicle Image Browser
   </h1>

   <div className="grid grid-cols-3 gap-6">

    <div className="bg-white rounded shadow overflow-hidden">
     <img
      src="https://upload.wikimedia.org/wikipedia/commons/1/12/Land_Rover_110_1983.jpg"
      className="w-full h-48 object-cover"
     />
     <div className="p-4 font-semibold">
      One Ten (1983)
     </div>
    </div>

    <div className="bg-white rounded shadow overflow-hidden">
     <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/54/Land_Rover_Defender_90.jpg"
      className="w-full h-48 object-cover"
     />
     <div className="p-4 font-semibold">
      Defender 90
     </div>
    </div>

    <div className="bg-white rounded shadow overflow-hidden">
     <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Land_Rover_Defender_110.jpg"
      className="w-full h-48 object-cover"
     />
     <div className="p-4 font-semibold">
      Defender 110
     </div>
    </div>

    <div className="bg-white rounded shadow overflow-hidden">
     <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/86/Land_Rover_Defender_130.jpg"
      className="w-full h-48 object-cover"
     />
     <div className="p-4 font-semibold">
      Defender 130
     </div>
    </div>

   </div>

  </div>

 )

}