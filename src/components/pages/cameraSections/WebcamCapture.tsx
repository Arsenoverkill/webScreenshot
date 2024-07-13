'use client';
import { useRef, useState } from 'react';
import scss from './WebcamCapture.module.scss';
import Webcam from 'react-webcam';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { usePostTodoMutation } from '@/redux/api/todo';

const WebcamCapture = () => {
	const webCam = useRef<Webcam>(null);
	const [image, setImage] = useState<string>('');
	const [uploadImage, setUploadImage] = useState<string>('');
	const [postTodoMutation] = usePostTodoMutation();

	async function screenshot() {
		const imageSrc = webCam.current?.getScreenshot();
		setImage(imageSrc!);
		await uploadImg(imageSrc!);
	}

	async function uploadImg(base64ImageUrl: string) {
		try {
			// base64 = Binary Large Object
			const blob = await fetch(base64ImageUrl).then((res) => res.blob());

			const formData = new FormData();
			formData.append('file', blob, 'screenshot');

			const { data: responseImage } = await axios.post(
				`${process.env.NEXT_PUBLIC_UPLOAD_URL}/upload/file`,
				formData
			);

			setUploadImage(responseImage.url);
		} catch (error) {
			console.log(error);
		}
	}
	async function setUploadUrl() {
		try {
			const newData = {
				title: 'Arsen4ik',
				img: uploadImage,
				isCompleted: false
			};

			postTodoMutation(newData);
			alert('Ваше фото успешно отправлено ✅');
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<section className={scss.WebcamCapture}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.screenshot}>
						<h1>Camera</h1>
						<Webcam
							width={400}
							height={400}
							audio={false}
							ref={webCam}
							screenshotFormat="image/png"
						/>
						<button onClick={screenshot}>Сделать снимок</button>
					</div>
					<div className={scss.addScreenshot}>
						{image ? (
							<Image width={400} height={300} src={image} alt="image" />
						) : (
							<Image width={400} height={300} src="" alt="image" />
						)}
						<Link href="/">
							<button style={{ marginLeft: '40px' }} onClick={setUploadUrl}>
								Отправить снимок
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WebcamCapture;
