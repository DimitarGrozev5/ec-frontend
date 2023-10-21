import zod from "zod";
import { useQuery } from "react-query";
import { sendRequest } from "./http-client";
import { useConfiguredMutation } from "./use-mutation";
import { useCallback, useEffect } from "react";
import { useAuth } from "../contexts/auth/use-auth";
import { useSnackbar } from "notistack";

type UsePhotosParamss = {
  orderBy?: "createdOn";
  order?: "asc" | "desc";
  limit?: number;
  page?: number;
};
export type ShortUser = {
  id: string;
  email: string;
};
export type Photo = {
  id: number;
  url: string;
  createdOn: Date;
  commentsCount: number;
  userId: number;
};
/**
 * Fetch all photos with optional querying
 * @param limit How many photos per page
 * @param page Page index
 * @param orderBy Field to order them by
 * @param order Ascending or Descending order
 */
export const useGetPhotos = ({
  limit,
  page,
  order,
  orderBy,
}: UsePhotosParamss) => {
  return useQuery(
    ["photos"],
    sendRequest({
      url: "photos",
      method: "GET",
      query: {
        order,
        orderBy,
        limit: limit?.toString(),
        page: page?.toString(),
      },
      responseParser: (d: { photos: (Photo & { User: ShortUser })[] }) =>
        d.photos,
    })
  );
};

/**
 * Fetch number of total photos
 */
export const useGetPhotosCount = () => {
  return useQuery(
    ["photos", "count"],
    sendRequest({
      url: `photos/count`,
      method: "GET",
      responseParser: (d: { count: number }) => d.count,
    })
  );
};

/**
 * Fetch photo by id
 * @param photoId Photo Id
 */
export const useGetPhoto = (photoId: string) => {
  return useQuery(
    ["photos", photoId],
    sendRequest({
      url: `photos/${photoId}`,
      method: "GET",
      responseParser: (d: { photo: Photo }) => d.photo,
    })
  );
};

/**
 * Handle deleting a photo
 * @param photoId Photo Id
 * @param onSuccess Callback to be executed on HTTP Success
 */
export const useDeletePhoto = (photoId: string, onSuccess?: () => void) => {
  return useConfiguredMutation(
    {
      url: `photos/${photoId}`,
      method: "DELETE",
    },
    ["photos"],
    {
      onSuccess,
    }
  );
};

export type Comment = {
  madeBy: {
    id: number;
    email: string;
  };
} & {
  id: number;
  userId: number;
  createdOn: Date;
  text: string;
  photoId: number;
};
/**
 * Fetch comments for specific photo
 * @param photoId Photo Id
 */
export const useGetPhotoComments = (photoId: string) => {
  return useQuery(
    ["photos", photoId, "comments"],
    sendRequest({
      url: `photos/${photoId}/comments`,
      method: "GET",
      responseParser: (d: { comments: Comment[] }) => d.comments,
    })
  );
};

/**
 * Post comment for photo
 * @param photoId Photo Id
 * @param onSuccess
 */
export const useAddComment = (photoId: string, onSuccess?: () => void) => {
  return useConfiguredMutation(
    {
      url: "comments",
      method: "POST",
    },
    ["photos", photoId, "comments"],
    {
      onSuccess,
    }
  );
};

type GetUsersParams = {
  orderBy?: "photosCount" | "createdOn";
  order?: "asc" | "desc";
  limit?: number;
  page?: number;
};
export type User = {
  id: number;
  isAdmin: boolean;
  email: string;
  createdOn: Date;
  photosCount: number;
};

/**
 * Fetch all users with optional querying
 * @param limit How many users per page
 * @param page Page index
 * @param orderBy Field to order them by
 * @param order Ascending or Descending order
 */
export const useGetUsers = ({
  orderBy,
  order,
  limit,
  page,
}: GetUsersParams) => {
  return useQuery(
    ["users"],
    sendRequest({
      url: `users`,
      method: "GET",
      query: {
        limit: limit?.toString(),
        page: page?.toString(),
        orderBy,
        order,
      },
      responseParser: (d: { users: User[] }) => d.users,
    })
  );
};

/**
 * Get total number of users
 */
export const useGetUsersCount = () => {
  return useQuery(
    ["users", "count"],
    sendRequest({
      url: `users/count`,
      method: "GET",
      responseParser: (d: { count: number }) => d.count,
    })
  );
};

/**
 * Register new user
 * @param onSuccess Callback to be executed on HTTP Success
 */
export const useRegister = (onSuccess?: () => void) => {
  return useConfiguredMutation(
    {
      url: "users/register",
      method: "POST",
    },
    undefined,
    {
      alertOnSuccess: { message: "User is registered" },
      onSuccess,
    }
  );
};

const LoginData_Schema = zod.object({
  userId: zod.coerce.string(),
  email: zod.string(),
  token: zod.string(),
  isAdmin: zod.coerce.boolean(),
});
/**
 * Get Logind credentials for user and save the to Auth Context
 */
export const useLogin = () => {
  const control = useConfiguredMutation(
    {
      url: "users/login",
      method: "POST",
    },
    undefined,
    {
      alertOnSuccess: { message: "User is Logged in successfully" },
    }
  );

  const { data, isSuccess } = control;

  const { setAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data) {
      try {
        const { userId, token, isAdmin } = LoginData_Schema.parse(data);
        setAuth(true, userId, token, isAdmin);
      } catch (error) {
        enqueueSnackbar("Invalid login data", { variant: "error" });
        setAuth(false, "", "");
      }
    }
  }, [data, enqueueSnackbar, isSuccess, setAuth]);

  return control;
};

/**
 * Logout user
 */
export const useLogout = () => {
  // TODO: Add backend logout call
  // Currently is not implemented at the backend

  const { setAuth } = useAuth();

  return { mutate: () => setAuth(false, "", "") };
};

/**
 * Upload file to Server
 * @param onSuccess Callback to be executed on HTTP Success
 */
export const useUploadFile = (onSuccess?: () => void) => {
  const control = useConfiguredMutation(
    {
      url: "photos",
      method: "POST",
      parseBodyAsJson: false,
    },
    ["photos"],
    {
      alertOnSuccess: { message: "Photo uploaded" },
      onSuccess,
    }
  );

  const mutate = useCallback(
    (file: File | null) => {
      if (file === null) return;

      const formData = new FormData();
      formData.append("photo-file", file);

      control.mutate(formData);
    },
    [control]
  );

  return { ...control, mutate };
};

/**
 * Post Contact Message
 * @param onSuccess Callback to be executed on HTTP Success
 */
export const useSendContactMsg = (onSuccess?: () => void) => {
  return useConfiguredMutation(
    {
      url: "contact",
      method: "POST",
    },
    undefined,
    {
      alertOnSuccess: { message: "Message is sent" },
      onSuccess,
    }
  );
};
