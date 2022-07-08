import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const SpeechTipsModal: React.FC = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger
      className="modal-btn btn-bg-success"
      aria-label="Open Voice Commands Tips"
    >
      Tips
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="modal-overlay">
        <AlertDialog.Content className="modal-content">
          <AlertDialog.Title className="modal-title">
            Voice Commands:
          </AlertDialog.Title>
          <AlertDialog.Description className="modal-description">
            <>
              Here are the commands that you have access to while Voice Commands
              are enabled:
            </>
            <>
              <ul>
                <li>
                  <span className="font-bold">Scroll up:</span> scrolls half of
                  a screen toward the top of the page
                </li>
                <li>
                  <span className="font-bold">Scroll down:</span> scrolls half
                  of a screen toward the bottom of the page.
                </li>
                <li>
                  <span className="font-bold">
                    Close Ingredients/Hide Ingredients:
                  </span>{" "}
                  closes the ingredients section, if present.
                </li>
                <li>
                  <span className="font-bold">
                    Open Ingredients/Show Ingredients:
                  </span>{" "}
                  opens the ingredients section, if present.
                </li>
                <li>
                  <span className="font-bold">Close Videos/Hide Videos:</span>{" "}
                  closes the videos section, if present.
                </li>
                <li>
                  <span className="font-bold">Open Videos/Show Videos:</span>{" "}
                  expands the videos section, if present.
                </li>
              </ul>
            </>
            <>
              If you are having difficulties getting the voice commands to work,
              say <span className="font-bold">"reset"</span> or{" "}
              <span className="font-bold">"clear"</span>.
            </>
          </AlertDialog.Description>
          <div className="modal-action-wrapper">
            <AlertDialog.Action
              className="modal-btn btn-bg-success"
              aria-label="Close Modal"
            >
              OK
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Overlay>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default SpeechTipsModal;
