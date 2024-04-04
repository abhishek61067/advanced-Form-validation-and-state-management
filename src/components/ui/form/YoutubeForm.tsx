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
  errorClassName,
  h1ClassName,
} from "@/constant/ui-constant";

import { useForm } from "react-hook-form";

let renderCount = 0;

// type
type FormValues = {
  username: string;
  email: string;
  channel: string;
};
const YoutubeForm = () => {
  renderCount++;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //   function to handle submit
  const submitHandler = (data: FormValues) => {
    console.log("form data: ", data);
  };

  return (
    <div className={bodyClassName}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        action=""
        className={cn("grid justify-center", centerVertically)}
        noValidate
      >
        <h1 className={h1ClassName}>Form State Management and Validation</h1>
        <p className="text-white/50 text-xs">Render count: {renderCount / 2}</p>
        <Section />
        <div className="grid gap-2">
          <label htmlFor="username" className={LabelClassName}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={InputClassName}
            {...register("username", {
              required: {
                value: true,
                message: "username required",
              },
            })}
          />
          <p className={errorClassName}>{errors.username?.message}</p>
          <label htmlFor="email" className={LabelClassName}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={InputClassName}
            {...register("email", {
              required: {
                value: true,
                message: "email required",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "invaild email format",
              },
            })}
          />
          <p className={errorClassName}>{errors.email?.message}</p>

          <label htmlFor="channel" className={LabelClassName}>
            Channel
          </label>
          <input
            type="text"
            id="channel"
            className={InputClassName}
            {...register("channel")}
          />
          <p className={errorClassName}>{errors.channel?.message}</p>

          <Button className={buttonClassName}>Submit</Button>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YoutubeForm;
