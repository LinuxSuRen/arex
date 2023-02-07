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
  keyword?: string;
  options: StructuredOptionType[];
  onChange?: (value: StructuredValue) => void;
  onSearch?: (keyword?: string) => void;
};

export type StructuredOptionRef = {
  reset: () => void;
};

const KeywordKey = '__keyword';
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

  const categoryOptions = useMemo<ItemType[]>(() => {
    const filterOptions = props.options.filter((o) => o.category.includes(props.keyword || ''));

    return filterOptions.length
      ? filterOptions.map((o) => ({
          label: o.category,
          key: o.category,
        }))
      : [{ label: 'Search for this text', key: KeywordKey }];
  }, [props.options, props.keyword]);

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
      <Carousel fade ref={carouselRef} dots={categoryOptions?.[0]?.key !== KeywordKey}>
        <Menu
          selectedKeys={[]}
          items={categoryOptions}
          onClick={({ key: category }) => {
            if (category === KeywordKey) return props.onSearch?.(props.keyword);

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
