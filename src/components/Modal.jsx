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
  maxWidth = "max-w-md", // Pozwala łatwo zmieniać szerokość okienka
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Tło przyciemniające */}
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

      {/* Kontener centrujący */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={`w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
        >
          {/* Tytuł modala (wyświetlany tylko, jeśli został podany) */}
          {title && (
            <DialogTitle
              as="h3"
              className="text-lg font-bold leading-6 text-gray-900 mb-4"
            >
              {title}
            </DialogTitle>
          )}

          {/* Główna zawartość wstrzykiwana przez props children */}
          <div className="text-gray-700">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
