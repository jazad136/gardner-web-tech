import * as AlertDialog from "@radix-ui/react-alert-dialog";

type Props = {
  isOpen: boolean;
};

const EmailVerification: React.FC<Props> = ({ isOpen }) => (
  <AlertDialog.Root open={isOpen}>
    <div className="flex h-screen items-center justify-center">
      <AlertDialog.Content className="z-50 rounded-2xl border bg-stone-100 p-8 text-center dark:bg-slate-800">
        <AlertDialog.Title className="prose dark:prose-dark mb-4 max-w-none text-4xl">
          Check Your Email
        </AlertDialog.Title>
        <AlertDialog.Description className="prose prose-xl dark:prose-dark max-w-none">
          <div>We have sent you an email notification.</div>
          <div>Look for an email from</div>
          <div>
            <a
              href="mailto:info@gardnerwebtech.com"
              className="font-light no-underline hover:underline dark:text-stone-400"
              target="_blank"
              rel="noreferrer noopener"
            >
              info@gardnerwebtech.com.
            </a>
          </div>
        </AlertDialog.Description>
      </AlertDialog.Content>
    </div>
  </AlertDialog.Root>
);

export default EmailVerification;
