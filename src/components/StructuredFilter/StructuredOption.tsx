import { Carousel, Menu } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useImmer } from 'use-immer';

export type StructuredOptionType = {
  category: string;
  operator: string[];
  value: string[] | number[];
};

export type StructuredValue = {
  category?: string;
  operator?: string;
  value?: string | number;
};

export type StructuredOptionProps = {
  options: StructuredOptionType[];
  onChange?: (value: StructuredValue) => void;
};

export type StructuredOptionRef = {
  reset: () => void;
};

const InitialValue = {
  category: undefined,
  operator: undefined,
  value: undefined,
};

const StructuredOption: ForwardRefRenderFunction<StructuredOptionRef, StructuredOptionProps> = (
  props,
  ref,
) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [value, setValue] = useImmer<StructuredValue>(InitialValue);

  const categoryOptions = useMemo<ItemType[]>(
    () =>
      props.options.map((o) => ({
        label: o.category,
        key: o.category,
      })),
    [props.options],
  );

  const operatorOptions = useMemo<ItemType[]>(
    () =>
      props.options
        .find((o) => o.category === value.category)
        ?.operator.map((operator) => ({
          label: operator,
          key: operator,
        })) || [],
    [value.category],
  );

  const valueOptions = useMemo<ItemType[]>(
    () =>
      props.options
        .find((o) => o.category === value.category)
        ?.value.map((value) => ({
          label: value,
          key: value,
        })) || [],
    [value],
  );

  useImperativeHandle(ref, () => ({
    reset() {
      setValue(InitialValue);
      carouselRef.current?.goTo(0);
    },
  }));

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Carousel ref={carouselRef}>
        <Menu
          selectedKeys={[]}
          items={categoryOptions}
          onClick={({ key: category }) => {
            setValue((value) => {
              value.category = category;
            });
            carouselRef.current?.next();
          }}
        />
        <Menu
          selectedKeys={[]}
          items={operatorOptions}
          onClick={({ key }) => {
            setValue((value) => {
              value.operator = key;
            });
            carouselRef.current?.next();
          }}
        />
        <Menu
          selectedKeys={[]}
          items={valueOptions}
          onClick={({ key }) => {
            setValue((value) => {
              value.value = key;
            });
            props.onChange?.({ ...value, value: key });
            carouselRef.current?.goTo(0, false);
          }}
        />
      </Carousel>
    </div>
  );
};

export default forwardRef(StructuredOption);
