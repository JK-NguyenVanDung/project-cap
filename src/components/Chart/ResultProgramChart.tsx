// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar, DataProps } from '@nivo/bar';
import Color from '../constant/Color';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({
  data,
  hasData,
}: {
  data: DataProps[];
  hasData: boolean;
}) => (
  <ResponsiveBar
    data={data}
    keys={['Điểm bài tập']}
    indexBy="testTitle"
    margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
    padding={0.3}
    groupMode="grouped"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
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
          {e?.data?.testTitle}:{' '}
          {e.data?.averageTestScore ? e.data.averageTestScore : 'No data'}
        </div>
      );
    }}
    fill={[
      {
        match: {
          id: 'fries',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'sandwich',
        },
        id: 'lines',
      },
    ]}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    minValue={0}
    maxValue={hasData ? 'auto' : 10}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 14,
        translateY: 63,
        itemsSpacing: 2,
        itemWidth: 240,
        itemHeight: 0,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
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
    <div className="w-full h-[80vh] bg-gray-200 rounded-xl  mt-12">
      <h1 className="px-8 pt-8 text-xl">Điểm bài tập</h1>
      <div className="h-[70vh]">
        <MyResponsiveBar
          data={data.map((item: any) => {
            return {
              id: 'Điểm bài tập',
              testTitle: item.testTitle,
              averageTestScore: item.averageTestScore,
              color: `${Color.theme.TORY_BLUE}`,
            };
          })}
          hasData={data.length > 0 ? true : false}
        />
      </div>
    </div>
  );
}
