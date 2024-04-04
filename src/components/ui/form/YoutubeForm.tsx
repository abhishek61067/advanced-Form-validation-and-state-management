import React from "react";
import { Button } from "../button";
import Section from "../Section";
import {
  InputClassName,
  LabelClassName,
  buttonClassName,
  h1ClassName,
} from "@/constant/ui-constant";

const YoutubeForm = () => {
  return (
    <div>
      <h1 className={h1ClassName}>Form State Management and Validation</h1>
      <Section />
      <form action="" className="grid justify-center">
        <div className="grid gap-2 w-[400px]">
          <label htmlFor="username" className={LabelClassName}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className={InputClassName}
          />
          <label htmlFor="email" className={LabelClassName}>
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className={InputClassName}
          />
          <label htmlFor="channel" className={LabelClassName}>
            Channel
          </label>
          <input
            type="text"
            name="channel"
            id="channel"
            className={InputClassName}
          />
          <Button className={buttonClassName}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default YoutubeForm;
