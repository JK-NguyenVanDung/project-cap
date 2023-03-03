// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';

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
    margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
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
          {'Buổi học: ' + e.point?.data?.x + ', '}
          {'Số học viên điểm danh: '}
          {e.point.data.y ? e.point.data.y.toString() : 'No data'}
        </div>
      );
    }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 0,
      max: hasData ? 'auto' : 100,
      stacked: true,
      reverse: false,
    }}
    areaOpacity={0.1}
    yFormat=" >-.2f"
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Quiz',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Người học',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
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
        translateX: 0,
        translateY: 66,
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
    <div className="w-full h-[80vh] mt-20   bg-white shadow-2xl rounded-xl ">
      <h1 className="px-8 pt-8 text-xl">Tỉ lệ điểm danh của khóa học</h1>
      <div className="h-[70vh]">
        <MyResponsiveLine
          data={[
            {
              id: 'Số học viên điểm danh',
              color: 'hsl(352, 70%, 50%)',
              data: data.map((item: any) => {
                console.log({
                  x: item?.titleAttendance,
                  y: item?.countLearnerAttendance,
                });
                return {
                  x: item?.titleAttendance,
                  y: item?.countLearnerAttendance,
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
