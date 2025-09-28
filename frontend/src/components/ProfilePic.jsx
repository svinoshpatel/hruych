export default function ProfilePic({ className, src }) {
	return(
		<div
			className={`
				rounded-full overflow-hidden ${className}
			`}
		>
			<img
				src={src || 'https://placehold.co/600x400'}
				alt='Profile picture'
				className='w-full h-full object-cover'
			/>
		</div>
	);
};

