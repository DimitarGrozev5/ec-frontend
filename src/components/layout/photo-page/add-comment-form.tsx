import zod from "zod";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import Button from "../../ui/button/button";
import { Controller, useForm } from "react-hook-form";
import TextArea from "../../ui/input/textfield";
import { useAddComment } from "../../../api/api";
import { useAuth } from "../../../contexts/auth/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  photoId: string;
};

const Comment_Schema = zod.object({
  comment: zod.string().min(1, "Please enter a comment"),
});

type CommentForm = zod.infer<typeof Comment_Schema>;

const AddCommentForm: React.FC<Props> = ({ photoId }) => {
  const { userId } = useAuth();

  const { control, handleSubmit, reset } = useForm<CommentForm>({
    defaultValues: { comment: "" },
    resolver: zodResolver(Comment_Schema),
  });

  const { isLoading, mutate: addComment } = useAddComment(photoId, () =>
    reset()
  );

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addComment({ text: data.comment, byUser: userId, forPhoto: photoId });
      })}
      className="flex flex-row items-stretch gap-2"
    >
      <Controller
        control={control}
        name="comment"
        render={({
          field: { value, onChange, onBlur },
          formState: { errors },
        }) => (
          <TextArea
            label="Comment"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.comment?.message}
            className="flex-1"
          />
        )}
      />

      <Button loading={isLoading} variant="contained" className="px-1.5">
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default AddCommentForm;
