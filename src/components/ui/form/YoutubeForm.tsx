import { cn } from "@/lib/utils";
import { Button } from "../button";
import Section from "../Section";
import { DevTool } from "@hookform/devtools";

import {
  InputClassName,
  LabelClassName,
  bodyClassName,
  buttonClassName,
  centerVertically,
  h1ClassName,
} from "@/constant/ui-constant";

import { useForm } from "react-hook-form";

const YoutubeForm = () => {
  const { register, control } = useForm();

  return (
    <div className={bodyClassName}>
      <form action="" className={cn("grid justify-center", centerVertically)}>
        <h1 className={h1ClassName}>Form State Management and Validation</h1>
        <Section />
        <div className="grid gap-2">
          <label htmlFor="username" className={LabelClassName}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={InputClassName}
            {...register("username")}
          />
          <label htmlFor="email" className={LabelClassName}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={InputClassName}
            {...register("email")}
          />
          <label htmlFor="channel" className={LabelClassName}>
            Channel
          </label>
          <input
            type="text"
            id="channel"
            className={InputClassName}
            {...register("channel")}
          />
          <Button className={buttonClassName}>Submit</Button>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YoutubeForm;
