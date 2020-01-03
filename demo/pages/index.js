import React, { useState } from "react";
import {
  stacksAddressToBtcAddress,
  btcAddressToStacksAddress,
  validateStacksAddress,
  fetchStacksAddressData,
  fetchStacksAddressDetails,
  microToStacks,
  stacksToMicro
} from "@blockstack/stacks-utils";
import {
  InputWithTitleAndValueDisplay,
  AsyncStacksInput
} from "../components/inputs";
import { Input, theme, Box, Type, Card } from "blockstack-ui";
import AppWrapper from "../components/app-wrapper";

const PageTitle = ({ ...rest }) => (
  <Box>
    <Type.h2 pb={6} {...rest} />
  </Box>
);

const SectionTitle = ({ ...rest }) => (
  <Box>
    <Type.h4 pb={6} {...rest} />
  </Box>
);

export default class HomePage extends React.Component {
  render() {
    return (
      <AppWrapper>
        <PageTitle>Stacks Utils</PageTitle>
        <SectionTitle>Addresses</SectionTitle>

        <Card>
          <InputWithTitleAndValueDisplay
            title={"Validate Stacks Address"}
            placeholder={"Enter a Stacks Address"}
            stringify
            valueLabel={"Is valid stacks address:"}
            fn={validateStacksAddress}
          />
          <InputWithTitleAndValueDisplay
            title={"Stacks to BTC"}
            placeholder={"Enter a Stacks Address"}
            fn={stacksAddressToBtcAddress}
          />
          <InputWithTitleAndValueDisplay
            title={"BTC to Stacks"}
            placeholder={"Enter a BTC Address"}
            fn={btcAddressToStacksAddress}
          />
        </Card>
        <SectionTitle mt={7}>Data Fetching</SectionTitle>
        <Card>
          <AsyncStacksInput
            fn={fetchStacksAddressDetails}
            title={"Fetch Stacks Address Data From Blockstack Explorer"}
            placeholder={"Enter a Stacks Address"}
          />
          <AsyncStacksInput
            fn={fetchStacksAddressData}
            title={"Fetch all Stacks Address Data"}
            placeholder={"Enter a Stacks Address"}
          />
        </Card>

        <SectionTitle mt={7}>Units</SectionTitle>
        <Card>
          <InputWithTitleAndValueDisplay
            fn={stacksToMicro}
            title={"Stacks to Microstacks"}
            placeholder={"100"}
            type="number"
          />
          <InputWithTitleAndValueDisplay
            fn={microToStacks}
            title={"Microstacks to Stacks"}
            placeholder={"1000000"}
            type="number"
          />
        </Card>
      </AppWrapper>
    );
  }
}
