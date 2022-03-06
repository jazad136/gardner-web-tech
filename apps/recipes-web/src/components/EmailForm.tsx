import { useFormik } from "formik";
import { Button } from "ui";
import * as Yup from "yup";

type Props = {
  onEmailSubmit: (email: string) => Promise<void>;
  isDisabled: boolean;
};

const EmailForm: React.FC<Props> = ({ onEmailSubmit, isDisabled }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      onEmailSubmit(values.email);
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
    }),
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col text-center"
      >
        <div className="w-full mt-0 mx-auto mb-5">
          <input
            placeholder="Enter your email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            className="w-full bg-white dark:bg-slate-50 rounded-md prose max-w-full p-2 prose border border-gray-300 focus-visible:outline-none text-center"
            disabled={isDisabled}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="prose prose-sm max-w-full text-red-600 mt-2">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div>
          <Button
            size="md"
            color="success"
            ariaLabel="Send Magic Link"
            isPill
            isDisabled={
              !!formik.errors.email || formik.values.email === "" || isDisabled
            }
            type="submit"
            isBold={false}
          >
            Send Magic Link
          </Button>
        </div>
      </form>
    </>
  );
};

export default EmailForm;
