import React, {useState,useEffect} from 'react';
import {Form, Upload, message,  Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import DefaultAvatar from '@/components/Elements/Avatars/DefaultAvatar';


export default function DefaultDragger(props) {
	if (!process.browser) {
		//console.debug('Home SERVER');
	} else {
		// console.debug('Home CLIENT', props);
	}

	if (!props) return <></>;

	//STYLE
	const draggerStyle = {
		style: {
			maxWidth: props.style && props.style.size ? props.style.size : '300px',
			maxHeight: props.style && props.style.size ? props.style.size : '300px',
			minWidth: props.style && props.style.size ? props.style.size : '300px',
			minHeight: props.style && props.style.size ? props.style.size : '300px',
			margin: 'auto',
			display: 'flex',
			justifyContent: 'center',
			alignContent: 'center',
			alignItems: 'center',
			borderRadius: '50%'
		}
	}

	//STATE
	const [stateProps, setStateProps] = useState({ loading: false, imageUrl: props.user && props.user.url ? props.user.url : false })

	useEffect(() => {
		return () => {
		}
	}, [stateProps])

	const RenderDagger = () => {


		//HANDLER
		async function beforeUpload(file) {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
			}

			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				message.error('Image must smaller than 2MB!');
			}

			if (isJpgOrPng && isLt2M) {
				file.preview = await getBase(file);
         props.user.customerPhoto = file.preview
					setStateProps({ loading: false, imageUrl: file.preview });
			}

			return isJpgOrPng && isLt2M;
		}

		const uploadFile = info => {
			if (info.file.status === 'uploading') {
				setStateProps({ loading: true, imageUrl: false });
				return;
			}
			if (info.file.status === 'done') {
				// Get this url from response in real world.
				getBase64(info.file.originFileObj, (imageUrl) => {
					if (imageUrl) props.user.customerPhoto = imageUrl;
					setStateProps({ loading: false, imageUrl: imageUrl });
				}
				)
			};
		}


		function getBase64(img, callback) {
			const reader = new FileReader();
			reader.addEventListener('load', () => callback(reader.result));
			reader.readAsDataURL(img);
		}

		function getBase(file) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

		let uploadProps = {
			beforeUpload: (file) => { return beforeUpload(file) },
			// onChange: (info) => { return uploadFile(info) },
			listType:"picture-card",
		}

		if (props.upload) uploadProps = { ...uploadProps, ...props.upload }

		return (
		       <Spin tip="Saving..." spinning={stateProps.loading} delay={500}>
			<Upload.Dragger  {...uploadProps} {...draggerStyle} name="files" >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag a file
        </p>
        <p className="ant-upload-hint">Support for .jpg or .png files.</p>
      </Upload.Dragger>
   </Spin>
	  );
  };

  const RenderAvatar = () => {
    return (
			<DefaultAvatar
				style={draggerStyle}
        src={
          props.user && props.user.customerPhoto
            ? props.user.customerPhoto
            : null
        }
      />
    );
  };

  return stateProps.imageUrl ? (
    RenderAvatar()
  ) : props.formItem ? (
    <Form.Item {...props.formItem}>{RenderDagger()}</Form.Item>
  ) : (
    RenderDagger()
  );
}

