import cn from "classnames";
import { Field, Form, Formik } from "formik";
import { Button } from "ui";
import * as Yup from "yup";

type Props = {
  isDisabled: boolean;
  handleSubmit: (email: string) => Promise<void>;
};

const EmailForm: React.FC<Props> = ({ isDisabled, handleSubmit }) => (
  <Formik
    initialValues={{
      email: "",
    }}
    onSubmit={(values) => {
      handleSubmit(values.email);
    }}
    validationSchema={Yup.object({
      email: Yup.string().email("Invalid email address").required(),
    })}
  >
    {({ touched, errors }) => (
      <Form className="flex flex-col text-center">
        <div className="mx-auto mt-0 mb-5 w-full">
          <Field
            placeholder="Enter your email"
            type="email"
            name="email"
            className={cn(
              "prose w-full rounded-md bg-white p-2 text-center focus-visible:outline-none dark:bg-slate-50 2xl:w-4/5",
              {
                "border-2 border-red-600 dark:border-red-500":
                  touched.email && errors.email,
                "border border-gray-300": !touched.email || !errors.email,
              }
            )}
            disabled={isDisabled}
          />
          {touched.email && errors.email && (
            <div className="prose prose-sm mt-2 max-w-full text-red-600 dark:text-red-500">
              {errors.email}
            </div>
          )}
        </div>
        <div>
          <Button
            size="md"
            color="secondary"
            ariaLabel="Send Magic Link"
            isPill
            isDisabled={!!errors.email || isDisabled}
            type="submit"
            isBold={false}
          >
            Send Magic Link
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default EmailForm;
