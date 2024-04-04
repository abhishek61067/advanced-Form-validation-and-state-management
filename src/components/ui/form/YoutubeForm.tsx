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

import { useFieldArray, useForm } from "react-hook-form";

let renderCount = 0;

// type
type FormValues = {
  username: string;
  email: string;
  channel: string;
  // nested object
  social: {
    linkedin: string;
    github: string;
  };
  // array
  phoneNumbers: string[];
  phNumbers: { number: string }[];
};
const YoutubeForm = () => {
  renderCount++;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // default values
    defaultValues: async () => {
      return fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((res) => res.json())
        .then((data) => {
          return {
            username: "codeek",
            email: data.email,
            channel: data.company.name,
            social: {
              linkedin: "codeek0",
              github: "codeek0",
            },
            phoneNumbers: ["12", "23"],
            phNumbers: [{ number: "" }],
          };
        });
    },
  });

  // useFieldArray
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

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
              // html native validations
              required: {
                value: true,
                message: "email required",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "invaild email format",
              },
              // custom validations
              validate: {
                notAdmin: (fieldValue) => {
                  return fieldValue === "admin@example.com"
                    ? "This email is reserved only for admin"
                    : true;
                },
                notBadDomain: (fieldValue) =>
                  fieldValue.endsWith("baddomain.com")
                    ? "Enter email other than blacklisted domains"
                    : true,
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
          {/* social medias */}
          <label htmlFor="linkedin" className={LabelClassName}>
            Linkedin
          </label>
          <input
            type="text"
            id="linkedin"
            className={InputClassName}
            {...register("social.linkedin")}
          />
          <label htmlFor="Github" className={LabelClassName}>
            Github
          </label>
          <input
            type="text"
            id="Github"
            className={InputClassName}
            {...register("social.github")}
          />
          <label htmlFor="primaryPhoneNumber" className={LabelClassName}>
            Primary Phone Number
          </label>
          <input
            type="text"
            id="primaryPhoneNumber"
            className={InputClassName}
            {...register("phoneNumbers.0")}
          />
          <label htmlFor="secondaryPhoneNumber" className={LabelClassName}>
            Secondary Phone Number
          </label>
          <input
            type="text"
            id="secondaryPhoneNumber"
            className={InputClassName}
            {...register("phoneNumbers.1")}
          />
          <label className={LabelClassName}>List of phone numbers</label>
          {fields.map((field, index) => {
            return (
              <>
                <input
                  key={index}
                  type="text"
                  {...register(`phNumbers.${index}.number`)}
                  className={InputClassName}
                />
                {index > 0 && (
                  <Button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </>
            );
          })}
          <Button
            className={buttonClassName}
            onClick={() => {
              append({ number: "" });
            }}
          >
            Add number to list
          </Button>

          <Button className={buttonClassName}>Submit</Button>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};

export default YoutubeForm;
