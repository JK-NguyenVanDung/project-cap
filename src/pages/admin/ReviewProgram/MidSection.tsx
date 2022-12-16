import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import {
  BsFillPlayCircleFill,
  BsFillCheckCircleFill,
  BsPeople,
} from 'react-icons/bs';
import { HiClipboardCheck } from 'react-icons/hi';
import { MdThumbUpOffAlt } from 'react-icons/md';
import View from '../../../assets/svg/View.svg';

import ActiveArrow from '../../../assets/svg/ActiveArrow';
import NonActiveArrow from '../../../assets/svg/NonActiveArrow';
import CustomButton from '../../../components/admin/Button';
import RightSection from '../../../components/Course/RightSection';
import { BiLike } from 'react-icons/bi';
import { useAppSelector } from '../../../hook/useRedux';
import { IAccountItem, IChapterItem, IProgramItem, ITest } from '../../../Type';
import apiService from '../../../api/apiService';
import CourseDetail from '../../../components/Course/CourseDetail';

const MidSection = (props: any) => {
  return (
    <>
      <CourseDetail {...props} />
    </>
  );
};

export default MidSection;
