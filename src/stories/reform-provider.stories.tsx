import { Meta, StoryObj } from "@storybook/react";
import React, { FormHTMLAttributes, useCallback } from "react";
import { ReformProvider } from "../reform-provider";
import { useReform } from "../use-reform";
import { IReformInputValidationError } from "../types";
import "./reform.css";

type ExampleFormData = {
  firstName: string;
  lastName: string;
  age: number;
};

function defaultFormData(): ExampleFormData {
  return {
    firstName: "",
    lastName: "",
    age: 0,
  };
}

function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  const [data] = useReform<ExampleFormData>();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(data);
      }}
      {...props}
    />
  );
}

function NameInputs() {
  const [, { useInput }] = useReform<ExampleFormData>();
  const valid = useCallback((value: string) => {
    const errors: IReformInputValidationError[] = [];
    if (/\W|[0-9]/.test(value))
      errors.push({
        name: "invalid-characters",
        reason: "Unexpected characters",
      });
    return errors;
  }, []);
  const [firstName, setFirstName, firstNameErrors] = useInput("firstName", {
    valid,
  });
  const [lastName, setLastName] = useInput("lastName", { valid });
  return (
    <>
      <label>
        <header>First Name</header>
        <input
          value={firstName}
          onChange={(ev) => {
            setFirstName(() => ev.target.value);
          }}
        />
        {!!firstNameErrors?.length && (
          <footer>
            {firstNameErrors.map(({ name, reason }) => (
              <span key={name}>{reason}</span>
            ))}
          </footer>
        )}
      </label>
      <label>
        <header>Last Name</header>
        <input
          value={lastName}
          onChange={(ev) => {
            setLastName(() => ev.target.value);
          }}
        />
      </label>
    </>
  );
}

/** Primary UI component for user interaction */
const StoryComponent = () => {
  return (
    <ReformProvider defaultValue={defaultFormData}>
      <Form>
        <NameInputs />
        <button type="submit">Submit</button>
      </Form>
    </ReformProvider>
  );
};

const meta = {
  title: "Reform",
  component: StoryComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof StoryComponent>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Reform: Story = {};
