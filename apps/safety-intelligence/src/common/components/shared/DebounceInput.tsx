import React, { FunctionComponent, useCallback, useState } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

type Props = {
  debounceInterval?: number;
  handleOnChange: (value?: string) => void;
  autoFocus?: boolean;
};

const DebouncedInput: FunctionComponent<Props> = ({
  handleOnChange,
  debounceInterval,
  autoFocus,
}: Props) => {
  const [value, setValue] = useState('');

  const debounceOnChange = useCallback(
    debounce((nextValue) => {
      handleOnChange(nextValue);
    }, debounceInterval ?? 1000),
    [debounceInterval, handleOnChange]
  );

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setValue(value);

    debounceOnChange(value);
  };

  return <Input onChange={onChange} value={value} autoFocus={autoFocus} />;
};

export default DebouncedInput;
