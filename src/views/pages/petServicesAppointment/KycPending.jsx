import React from "react";
import { Sparkles } from "lucide-react";

function PendingPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-[#52B2AD]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-[#52B2AD]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Verification in Progress
        </h2>

        <p className="text-gray-600">
          Your account is being verified. Please check back soon!
        </p>
      </div>
    </div>
  );
}

export default PendingPage;
