import { IProgramItem } from '../../Type';

const ReviewTab = ({ program }: { program: IProgramItem }) => {
  return (
    <>
      <p className="pt-4 text-xl font-semibold text-black font-bold grid place-items-center	 h-full w-full">
        Chương có bình luận nào
      </p>
    </>
  );
};

export default ReviewTab;
