import Spin from 'antd/lib/spin';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

export default function ({
  loading,
  className,
}: {
  loading: boolean;
  className?: string;
}) {
  return (
    <>
      {loading && (
        <div
          className={`flex justify-center content-center items-center h-screen ${className}`}
        >
          <Spin
            className="text-primary"
            indicator={antIcon}
            tip="Đang tải..."
            spinning={loading}
          />
        </div>
      )}
    </>
  );
}
