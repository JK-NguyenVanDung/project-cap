// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { getYears } from '../../utils/uinqueId';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({
  data /* see data tab */,
  hasData,
}: {
  data: any;
  hasData: boolean;
}) => (
  <ResponsiveLine
    data={data}
    enableArea={true}
    curve="monotoneX"
    enableGridX={false}
    margin={{ top: 50, right: 40, bottom: 30, left: 60 }}
    colors={['#4169E1']}
    tooltip={(e) => {
      return (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'black',
          }}
        >
          {e.point?.data?.x + ', '}
          {'Tỉ lệ điểm danh: '}
          {e.point.data.y ? e.point.data.y.toString() : '0'}
        </div>
      );
    }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 0,
      max: hasData ? 'auto' : 10,
      stacked: true,
      reverse: false,
    }}
    areaOpacity={0.1}
    yFormat=" >-.2f"
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom',
        direction: 'column',
        justify: false,
        translateX: 200,
        translateY: -200,
        itemWidth: 100,
        itemHeight: 20,
        itemsSpacing: 4,
        symbolSize: 20,
        symbolShape: 'circle',
        itemDirection: 'left-to-right',
        itemTextColor: '#777',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
export default function ({ data }: { data: any }) {
  return (
    <div className="w-full min-h-[40vh]   bg-white shadow-2xl rounded-xl ">
      <div className="flex pt-8 justify-between mr-6">
        <h1 className="px-8  text-xl">Tỉ lệ điểm danh của khóa học</h1>
        <div className="flex px-2 items-center border border-black rounded mr-4">
          <IoCalendarNumberOutline className="mr-4 text-lg" />
          <p className="text-lg"> {getYears()}</p>
        </div>
      </div>
      <div className="h-[39vh]">
        <MyResponsiveLine
          data={[
            {
              id: 'Số học viên điểm danh',
              color: 'hsl(352, 70%, 50%)',
              data: data.map((item: any) => {
                return {
                  x: 'Tháng ' + item?.month,
                  y: item?.countLearner,
                };
              }),
            },
          ]}
          hasData={data.length > 0 ? true : false}
        />
      </div>
    </div>
  );
}
