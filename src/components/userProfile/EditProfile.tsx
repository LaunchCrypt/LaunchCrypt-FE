import { Loader2, Upload, User, X } from 'lucide-react'
import React, { useState } from 'react'

function EditProfile(currentProfile, onClose) {
    const [form, setForm] = useState(currentProfile);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const handleSubmit = async (e) => {

    }

    const handleImageChange = () => {

    }
    return (
        <div className="w-[800px] rounded-2xl">
            <div className="flex items-center justify-between pl-6">
                <h2 className="text-xl font-medium text-white">Edit Profile</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-[#1E1E23] flex items-center justify-center overflow-hidden border-2 border-gray-800">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 p-1 bg-[#2A2A30] rounded-full cursor-pointer border border-gray-800">
                            <Upload className="w-4 h-4 text-white" />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <span className="text-sm text-gray-400">Click to upload new image</span>
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 text-left">
                        Username
                    </label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#1E1E23] border border-gray-800 rounded-lg
                text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        placeholder="Enter username"
                    />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 text-left">
                        Bio
                    </label>
                    <textarea
                        value={form.bio}
                        onChange={e => setForm(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#1E1E23] border border-gray-800 rounded-lg
                text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20
                min-h-[100px] resize-none"
                        placeholder="Tell us about yourself"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                bg-purple-500 hover:bg-purple-600 transition-colors
                text-white font-medium min-w-[120px]"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile