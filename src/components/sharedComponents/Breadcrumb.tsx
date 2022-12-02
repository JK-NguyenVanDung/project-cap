import React from 'react';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useRedux';
import { actions } from '../../Redux';

export default function ({
  router1,
  router2,
  router3,
  name,
  name2,
  name3,
}: {
  router1?: any;
  router2?: any;
  router3?: any;
  name?: string;
  name2?: any;
  name3?: any;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ItemBradcrumb = [
    {
      router1: router1,
      router2: router2,
      router3: router3,
      name: name,
      name2: name2,
      name3: name3,
    },
  ];
  return (
    <Breadcrumb
      style={{
        position: 'relative',
        zIndex: 99,
        margin: 10,
      }}
      className="cursor-pointer"
    >
      {ItemBradcrumb.map((item, index) => {
        return (
          <>
            <Breadcrumb.Item
              key={index + 1}
              onClick={() => {
                navigate(`${router1}`);
                dispatch(actions.formActions.setNameMenu(`${name}`));
              }}
              className="text-[16px] font-bold"
            >
              {item.name}
            </Breadcrumb.Item>
            {item.name2 || item.name3 ? (
              <>
                <Breadcrumb.Item
                  key={index}
                  onClick={() => navigate(`${router2 ? router2 : ''}`)}
                  className="text-[16px] font-bold"
                >
                  {item.name2}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  key={index}
                  onClick={() => navigate(`${router3 ? router3 : ''}`)}
                  className="text-[16px] font-bold text-[#252B42]"
                >
                  {item.name3}
                </Breadcrumb.Item>
              </>
            ) : (
              ''
            )}
          </>
        );
      })}
    </Breadcrumb>
  );
}
