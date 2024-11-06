import React from "react";

function Loading() {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 p-8 rounded-lg flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white text-lg font-medium">Creating Your Token...</p>
                <p className="text-purple-200 text-sm mt-2">Please wait while we process your request</p>
            </div>
        </div>
    );
};

export default Loading;