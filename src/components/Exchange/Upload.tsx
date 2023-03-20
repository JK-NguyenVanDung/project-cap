import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { MdCloudUpload } from 'react-icons/md';

const { Dragger } = Upload;

const props: UploadProps = {
  multiple: false,
  showUploadList: {
    showDownloadIcon: false,
  },

  name: 'file',

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const UploadImage = ({
  text,
  onUpload,
  setFile,
  onChange,
  fileList,
}: {
  text?: string;
  onUpload?: any;
  setFile: any;
  fileList: any;
  onChange: any;
}) => (
  <Dragger
    maxCount={1}
    {...props}
    className="min-h-[25vh] rounded-2xl p-6  "
    action={(e) => onUpload(e)}
    accept="image/png, image/jpeg"
    fileList={fileList}
    onChange={onChange}
  >
    <MdCloudUpload className="w-full text-center text-6xl text-primary " />

    <p className="ant-upload-text">Chọn hoặc kéo ảnh chứng chỉ để gửi lên</p>
    <p className="ant-upload-hint">Hỗ trợ các tệp PNG và JPEG</p>
  </Dragger>
);

export default UploadImage;
