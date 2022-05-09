import { useState, DragEvent } from "react";

type ImageProps = {
	src: string;
	filename: string;
	quit: () => void;
};

type FileSelectorProps = {
	multiple?: true;
};

const Image = ({ src, filename, quit }: ImageProps) => {
	return (
		<figure>
			<span className="" onClick={quit}>
				x
			</span>
			<img src={src} />
			<figcaption>{filename}</figcaption>
		</figure>
	);
};

export const FileSelector = ({ multiple }: FileSelectorProps) => {
	const [selectedImages, setSelectedImages] = useState<File[]>();
	const [dragOverStatus, setDragOverStatus] = useState<boolean>(false);

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

		console.log(fileList);

		// files array
		const files: File[] = [];

		for (let i = 0; i < fileList.length; i++) {
			files.push(fileList.item(i)!);
		}

		setSelectedImages({ ...(multiple ? selectedImages : {}), ...files });
	};

	return (
		<div
			onDragEnter={handleOnDrag}
			onDragLeave={handleOnDrag}
			onDragOver={handleOnDragOver}
			onDrop={handleOnDrop}
		>
			{selectedImages?.length ? (
				<ul>
					{selectedImages.map((image, index) => (
						<li key={index}>{image.name}</li>
					))}
				</ul>
			) : (
				"Nothing"
			)}

			{JSON.stringify(selectedImages)}
		</div>
	);
};
