// =====================================================
// JustDefenders ©
// File: /app/suppliers/[id]/upgrade/page.tsx
// Timestamp: 22 March 2026 11:32 (Sydney)
// Purpose: Supplier upgrade page
// =====================================================

export default function UpgradePage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Upgrade Supplier Tier
      </h1>

      <div className="grid grid-cols-2 gap-4">

        {/* SILVER */}
        <div className="panel">
          <h2 className="text-lg font-bold">Silver</h2>
          <p className="text-sm text-gray-400">
            Increased visibility
          </p>

          <button className="mt-2 bg-gray-600 px-4 py-2 rounded">
            Upgrade to Silver
          </button>
        </div>

        {/* GOLD */}
        <div className="panel">
          <h2 className="text-lg font-bold text-yellow-400">
            Gold
          </h2>
          <p className="text-sm text-gray-400">
            Maximum exposure + ranking boost
          </p>

          <button className="mt-2 bg-yellow-600 px-4 py-2 rounded">
            Upgrade to Gold
          </button>
        </div>

      </div>

    </div>
  );
}