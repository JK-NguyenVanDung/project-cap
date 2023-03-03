import { ResponsivePie } from '@nivo/pie';
import { IProgramResults } from '../../Type';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data }: { data: any }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
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
          {e?.datum?.label}:{' '}
          {e.datum?.value ? e.datum.value.toLocaleString() : 'No data'}
        </div>
      );
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 2]],
    }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'ruby',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'c',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'go',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'python',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'scala',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'lisp',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'elixir',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'javascript',
        },
        id: 'lines',
      },
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 130,
        itemHeight: 18,
        itemTextColor: '#fff',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#111',
            },
          },
        ],
      },
    ]}
  />
);
export default function ({ data }: { data: IProgramResults }) {
  return (
    <>
      <div
        className={` hover:scale-105 w-full  ml-10   rounded-xl opacity-90 shadow-2xl pl-4 py-4  flex bg-gradient-to-b from-pink-100    to-blue-300`}
      >
        <div className="flex w-full flex-col h-full justify-between text-white">
          <p className="text-xl font-bold">Tỉ lệ tham gia khóa học</p>
          <MyResponsivePie
            data={[
              {
                id: 'Đã nghỉ học',
                label: 'Đã nghỉ học',
                value: data?.countLearnerStopParticipating,
                color: 'hsl(81, 70%, 50%)',
              },
              {
                id: 'Chưa hoàn thành',
                label: 'Chưa hoàn thành',
                value: data?.countLearnerIncomplete
                  ? data?.countLearnerIncomplete
                  : 100,
                color: 'hsl(171, 70%, 50%)',
              },
              {
                id: 'Đã hoàn thành',
                label: 'Đã hoàn thành',
                value: data?.countLearnerComplete,
                color: 'hsl(269, 70%, 50%)',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
