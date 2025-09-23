import { motion, AnimatePresence } from "framer-motion";
export default function PopUp({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center">
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  ❌ Gagal Menambah File
                </h2>
                <p className="text-gray-600">
                  Kamu hanya bisa mengupload maksimal{" "}
                  <span className="font-semibold text-red-500">5 file</span>.
                  Hapus file yang sudah ada sebelum menambah yang baru.
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
