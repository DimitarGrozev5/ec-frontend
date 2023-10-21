/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSnackbar } from "notistack";

import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { RequestConfig, sendRequest } from "./http-client";
import Button from "../components/ui/button/button";
import { useAuth } from "../contexts/auth/use-auth";

type EventHandlers = {
  onSuccess?: () => void;
  onError?: () => void;

  alertOnSuccess?: {
    message: string;
    persist?: boolean;
    duration?: number;
    withAction?: boolean;
  };
  alertOnError?: {
    message?: string;
    persist?: boolean;
    duration?: number;
    withAction?: boolean;
  };
};

/**
 * Wrapper for React Query useMutation
 * It handles authorization, tag invalidation and user feedback
 * @param config Config object for HTTP Request
 * @param invalidates Tags to be invalidated
 * @param onSuccess Callback to be executed on HTTP Request success
 * @param onFailure Callback to be executed on HTTP Request failure
 * @param alertOnSuccess Message be displayed on HTTP Request success
 * @param alertOnFailure Message be displayed on HTTP Request failure
 * @returns 
 */
export const useConfiguredMutation = (
  config: RequestConfig,
  invalidates: QueryKey | undefined,
  {
    onSuccess = () => {},
    onError = () => {},
    alertOnSuccess,
    alertOnError = {},
  }: EventHandlers
): UseMutationResult => {
  const { token } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const result = useMutation(
    sendRequest({
      ...config,
      authToken: token || undefined,
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(invalidates, {
          exact: false,
        });
        onSuccess();
        if (alertOnSuccess) {
          const key = enqueueSnackbar(alertOnSuccess.message, {
            autoHideDuration: alertOnSuccess.duration,
            persist: !!alertOnSuccess.persist,
            action:
              !!alertOnSuccess.persist || !!alertOnSuccess.withAction ? (
                <Button onClick={() => closeSnackbar(key)}>ОК</Button>
              ) : undefined,
            variant: "success",
          });
        }
      },
      onError: (error) => {
        onError();
        if (alertOnError) {
          let msgFromError = "Нещо се обърка";
          if (error && typeof error === "object") {
            if (
              "userMessage" in error &&
              typeof error.userMessage === "string"
            ) {
              msgFromError = error.userMessage;
            } else if (
              "message" in error &&
              typeof error.message === "string"
            ) {
              msgFromError = error.message;
            }
          }

          const key = enqueueSnackbar(alertOnError.message ?? msgFromError, {
            autoHideDuration: alertOnError.duration,
            persist: !!alertOnError.persist,
            action:
              !!alertOnError.persist || !!alertOnError.withAction ? (
                <Button onClick={() => closeSnackbar(key)}>ОК</Button>
              ) : undefined,
            variant: "error",
          });
        }
      },
    }
  );

  return result;
};
