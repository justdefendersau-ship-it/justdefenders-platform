"use client"

/*
JustDefenders ©
File: app/components/AlertsPanel.tsx
Timestamp: 16 March 2026 15:42

Alerts & Risk Notifications
Restores demo data.
*/

export default function AlertsPanel(){

  const alerts=[

    "Turbo actuator failure risk detected",
    "Service interval approaching",
    "Battery health declining"

  ]

  return(

    <div className="bg-slate-800 rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        Alerts & Risk Notifications
      </h2>

      <div className="space-y-3">

        {alerts.map((a,i)=>(

          <button
            key={i}
            className="w-full text-left p-3 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            {a}
          </button>

        ))}

      </div>

    </div>

  )

}