// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';
import { IoCalendarNumberOutline } from 'react-icons/io5';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({
  data,
  hasData,
}: {
  data: any;
  hasData: boolean;
}) => (
  <ResponsiveBar
    data={data}
    keys={['ProgramCount']}
    indexBy="testTitle"
    margin={{ top: 50, right: 30, bottom: 100, left: 60 }}
    padding={0.3}
    groupMode="grouped"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={({ id, data }: any) => data[`Color`]}
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
          {e.data?.ProgramCount
            ? e.data.ProgramCount + ' Chương Trình'
            : 'No data'}
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
  />
);
function getYears() {
  var year = new Date().getFullYear();
  var lastyear = new Date().getFullYear() - 1;
  var range = [];
  var lastrange = [];
  var academicYear = [];
  lastrange.push(lastyear);
  range.push(year);
  for (var i = 1; i < 2; i++) {
    lastrange.push(lastyear + i);
    range.push(year + i);
    academicYear.push(
      lastrange[i - 1] + '-' + lastrange[i].toString().slice(-2),
    );
    var fullyear = lastrange.concat(range);
  }
  return academicYear;
}
export default function ({ data }: { data: any }) {
  return (
    <div className="w-full h-fit bg-white rounded-xl mx-2 shadow-xl">
      <div className="flex justify-between items-center w-full  pt-8">
        <h1 className="px-4 text-xl">Số lượng khóa học theo năm học</h1>
        <div className="flex px-2 items-center border border-black rounded mr-4">
          <IoCalendarNumberOutline className="mr-4 text-lg" />
          <p className="text-lg"> {getYears()}</p>
        </div>
      </div>
      <div className="h-[80vh]">
        <MyResponsiveBar
          data={data.map((item: any) => {
            return {
              id: 'Điểm trung bình',
              testTitle: 'Tháng ' + item.month,
              ProgramCount: item.programs,
              Color: getColor(),
            };
          })}
          hasData={data.length > 0 ? true : false}
        />
      </div>
    </div>
  );
}

function getColor() {
  return (
    'hsl(' +
    360 * Math.random() +
    ',' +
    (25 + 70 * Math.random()) +
    '%,' +
    (85 + 10 * Math.random()) +
    '%)'
  );
}
