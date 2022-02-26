import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface SpeechAlertProps {
  handleAccept: () => void;
  handleCancel: () => void;
  enableSpeechRecognition: boolean;
}

export default ({
  handleAccept,
  handleCancel,
  enableSpeechRecognition,
}: SpeechAlertProps) => (
  <AlertDialog.Root defaultOpen={true}>
    <AlertDialog.Trigger
      className="modal-btn btn-bg-danger"
      aria-label="Open Voice Commands Modal"
      disabled={!enableSpeechRecognition}
    >
      Voice Commands
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="modal-overlay" />
      <AlertDialog.Content className="modal-content">
        <AlertDialog.Title className="modal-title">
          Enable Voice Commands
        </AlertDialog.Title>
        <AlertDialog.Description className="prose dark:prose-dark max-w-full mb-4">
          {enableSpeechRecognition ? (
            <>
              Voice commands on this page will allow you to navigate the page by
              speaking and will keep the screen awake while you make your
              recipe. Would you like to enable or disable voice commands for
              this page?
            </>
          ) : (
            <>
              Your browser does not support voice recognition. Please use a
              different browser to use this functionality.
            </>
          )}
        </AlertDialog.Description>
        <div className="modal-action-wrapper">
          <AlertDialog.Cancel
            onClick={handleCancel}
            className="modal-btn btn-bg-danger"
            aria-label="Disable Voice Commands"
          >
            Disable
          </AlertDialog.Cancel>
          {enableSpeechRecognition ? (
            <AlertDialog.Action
              onClick={handleAccept}
              className="modal-btn btn-bg-success"
              aria-label="Enable Voice Commands"
            >
              Enable
            </AlertDialog.Action>
          ) : (
            <></>
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
