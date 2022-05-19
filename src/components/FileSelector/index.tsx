import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState, DragEvent } from "react";

type ImageProps = {
	src: string;
	filename: string;
	id: number;
	quit: (id: number) => void;
};

type FileSelectorProps = {
	multiple?: true;
};

// Preview image
const Image = ({ src, id, filename, quit, ...props }: ImageProps) => {
	return (
		<figure
			{...props}
			className="bg-white rounded-sm shadow-lg px-2 py-4 relative flex flex-col"
		>
			<FontAwesomeIcon
				icon={faWindowClose}
				onClick={() => quit(id)}
				className="absolute right-0 mx-2 my-1 text-lg text-blue-dark hover:cursor-pointer hover:text-slate-100"
			/>
			<img src={src} className="h-24 object-cover" />
			<figcaption className="px-1 pt-2 text-xs text-zinc-600 font-semibold tracking-wide">
				{filename}
			</figcaption>
		</figure>
	);
};

export const FileSelector = ({ multiple }: FileSelectorProps) => {
	const [selectedImages, setSelectedImages] = useState<File[]>([]);
	const [dragOverStatus, setDragOverStatus] = useState<boolean>(false);

	const handleQuitImage = (id: number) => {
		const stayedImages = selectedImages.filter((image, index) => {
			return index != id;
		});

		setSelectedImages(stayedImages);
	};

	// to handle when drag enter or drag leave.
	const handleOnDrag = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setDragOverStatus(!dragOverStatus);
	};

	const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// change status when image/images dropped
		setDragOverStatus(false);

		const { files: fileList } = event.dataTransfer;

		// when try to send various files
		if ((fileList.length > 1 || selectedImages?.length) && !multiple) {
			// message indicating that not allow multiple files
			return;
		}

		// files array
		const files: File[] = [];

		for (let i = 0; i < fileList.length; i++) {
			files.push(fileList.item(i)!);
		}

		setSelectedImages([...(multiple ? selectedImages : []), ...files]);
	};

	return (
		<div
			onDragEnter={handleOnDrag}
			onDragLeave={handleOnDrag}
			onDragOver={handleOnDragOver}
			onDrop={handleOnDrop}
		>
			<div className="grid grid-cols-6 gap-4 bg-zinc-50 p-4">
				{selectedImages?.length
					? selectedImages.map((image, index) => {
							const blob = URL.createObjectURL(image);
							return (
								<Image
									key={index}
									filename={image.name}
									src={blob}
									quit={handleQuitImage}
									id={index}
								/>
							);
					  })
					: "Nothing"}
			</div>
		</div>
	);
};
