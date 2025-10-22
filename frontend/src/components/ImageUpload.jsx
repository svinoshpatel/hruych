import { useState, useEffect } from 'react';

export default function ImageUpload({ selectedFile, setSelectedFile }) {
	const [previewUrl, setPreviewUrl] = useState(null);

	useEffect(() => {
		if (!selectedFile) {
			setPreviewUrl(null);
		return;
		}

		// Create preview URL
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreviewUrl(objectUrl);

		// Clean up to avoid memory leaks
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
    		setSelectedFile(file);
		}
	};

	return (
		<div>
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				id='file-upload'
				className='hidden'
			/>

			<label
				htmlFor='file-upload'
				className='bg-mocha-base p-2 rounded-full'
			>
				Choose file
			</label>

			{previewUrl && (
				<div>
					<img 
						src={previewUrl} 
						alt="Preview" 
					/>
				</div>
			)}
		</div>
	);
};

