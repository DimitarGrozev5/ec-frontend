import zod from "zod";
import TextInput from "../../ui/input/text-input";
import Header2 from "../../ui/text/h2";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "../../ui/input/textfield";
import { tw } from "../../../util/tw";
import Button from "../../ui/button/button";
import { useSendContactMsg } from "../../../api/api";

const ContactsForm_Schema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(1, "Name is too short"),
  message: zod.string().min(1, "Message is too short"),
});

type ContactsForm = zod.infer<typeof ContactsForm_Schema>;

const ContactsPage: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<ContactsForm>({
    defaultValues: { email: "", message: "", name: "" },
    resolver: zodResolver(ContactsForm_Schema),
  });

  const { isLoading, mutate: sentMsg } = useSendContactMsg(reset);
  return (
    <>
      <Header2>Contact Us</Header2>
      <form
        onSubmit={handleSubmit((data) => {
          sentMsg(data);
        })}
        className={tw(
          "self-stretch px-2 md:w-[30rem] md:self-center",
          "flex flex-col items-stretch gap-4"
        )}
      >
        <Controller
          control={control}
          name="name"
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <TextInput
              label="Your Name"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <TextInput
              label="Your Email"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="message"
          render={({
            field: { value, onChange, onBlur },
            formState: { errors },
          }) => (
            <TextArea
              label="Message"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.message?.message}
            />
          )}
        />

        <Button variant="contained" loading={isLoading}>
          Send
        </Button>
      </form>
    </>
  );
};

export default ContactsPage;
