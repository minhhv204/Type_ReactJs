import axios from 'axios';
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
const uploadFileCloudinary = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append('upload_preset', 'ECMA-IMAGE'); // Thay bằng upload preset của bạn
        formData.append('folder', "ECMA")
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dh9hnswr2/image/upload", // Thay bằng cloudinary name của bạn
            formData,
        );
        return response.data.url
    } catch (error) {
        // handle error here
        console.error(error);
    }
};

export { uploadFileCloudinary };