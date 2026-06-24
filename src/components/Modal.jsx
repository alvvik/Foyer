import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-background/20 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={`w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-background-sec p-6 text-left align-middle shadow-xl transition-all`}
        >
          {title && (
            <DialogTitle
              as="h3"
              className="text-lg font-bold leading-6 text-text mb-4"
            >
              {title}
            </DialogTitle>
          )}

          <div className="text-text">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
