import { Loader2, Upload, User, X } from 'lucide-react'
import React, { useState } from 'react'
import { axiosInstance, PATCH_API, POST_API } from '../../apis/api';
import Swal from 'sweetalert2';

interface EditProfileProps {
    username: string,
    bio: string,
    image: File
}
function EditProfile({ currentProfile, onClose, setUserInfo }) {
    const [form, setForm] = useState<EditProfileProps>({
        username: currentProfile.name,
        bio: currentProfile.bio,
        image: null as unknown as File
    });
    const [newImage, setNewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const handleSubmit = async () => {
        const formData = new FormData();
        const userData = {
            name: form.username,
            bio: form.bio
        }
        formData.append('data', JSON.stringify(userData));
        if (newImage) {
            formData.append('image', newImage);
        }

        try {
            const newUser = await axiosInstance.patch(
                PATCH_API.UPDATE_USER(currentProfile.publicKey), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                customClass: {
                    popup: 'rounded-lg shadow-xl',
                    title: 'font-medium text-xl mb-2',
                    confirmButton: 'bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600',
                    actions: 'space-x-2',  // Add spacing between buttons
                },
                title: 'Update user profile successfully',
                icon: 'success',
                iconColor: '#a855f7', // Purple-500 color
                background: '#1a1a2e',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                showCloseButton: true,
            });
            setUserInfo(newUser.data);


            onClose();
        } catch (error) {
            console.log(error)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }
    return (
        <div className="w-[800px] rounded-2xl">
            <div className="flex items-center justify-between pl-6">
                <h2 className="text-xl font-medium text-white">Edit Profile</h2>
            </div>

            <div className="p-6 space-y-6">
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
                                onChange={e => handleImageChange(e)}
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
                        onClick={handleSubmit}
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
            </div>
        </div>
    )
}

export default EditProfile