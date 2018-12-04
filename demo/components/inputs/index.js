import React, { useState } from "react";
import { Input, theme, Box, Type, Scrollbars } from "blockstack-ui";
import { fetchStacksAddressData, validateStacksAddress } from "../../../src";
import debounce from "lodash.debounce";
const AsyncStacksInput = ({
  fn,
  title,
  stringify,
  valueLabel,
  async,
  ...rest
}) => {
  if (!fn) return;
  const [asyncValue, setAsyncValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValueChange = debounce(
    value => requestIdleCallback(() => handleChange(value)),
    200
  );

  const handleChange = async value => {
    if (value === "") {
      setError(null);
      setAsyncValue(null);
      setLoading(false);
      return;
    }
    let valid = false;
    try {
      validateStacksAddress(value);
    } catch (e) {
      setError(e.message);
      return;
    }
    !loading && setLoading(true);
    try {
      console.log("fetching");

      const data = await fetchStacksAddressData(value);
      console.log(data);
      setAsyncValue(data);
      setLoading(false);
      return data;
    } catch (e) {
      return e.message;
    }
  };

  return (
    <Box pb={4}>
      <Type.h5 pb={4}>{title}</Type.h5>
      <Input {...rest} onChange={e => handleValueChange(e.target.value)} />
      {error ? (
        <Box py={4}>{error}</Box>
      ) : loading || asyncValue ? (
        <Box py={4}>
          {valueLabel ? <Type pb={4}>{valueLabel}</Type> : null}
          <Scrollbars maxHeight={400} maxWidth={"100%"} overflow="auto">
            <Type is="pre" fontFamily="brand">
              {loading
                ? "loading..."
                : asyncValue
                ? JSON.stringify(asyncValue, null, "\t")
                : null}
            </Type>
          </Scrollbars>
        </Box>
      ) : null}
    </Box>
  );
};

const InputWithTitleAndValueDisplay = ({
  fn,
  title,
  stringify,
  valueLabel,
  async,
  ...rest
}) => {
  const [value, setValue] = useState("");

  const handleValueChange = debounce(
    value => requestIdleCallback(() => setValue(value)),
    200
  );

  const wrapperFn = func => (stringify ? JSON.stringify(func) : func);

  const handleChange = value => {
    if (!fn) return;
    try {
      return fn(value);
    } catch (e) {
      return e.message;
    }
  };

  return (
    <Box pb={4}>
      <Type.h5 pb={4}>{title}</Type.h5>
      <Input {...rest} onChange={e => handleValueChange(e.target.value)} />
      {value !== "" ? (
        <Box py={4}>
          {valueLabel ? <Type pb={4}>{valueLabel}</Type> : null}
          <Box>
            <Type is="pre" fontFamily="brand">
              {wrapperFn(handleChange(value))}
            </Type>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export { InputWithTitleAndValueDisplay, AsyncStacksInput };
