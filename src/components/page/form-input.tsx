import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Button from "../ui/button";

import ImgFile from "../../../Group.png";

const FormSchema = z.object({
  nama_lengkap: z.string().optional().or(z.literal("")),
  nim: z.string().optional().or(z.literal("")),
  nomor_telepon: z.string().optional().or(z.literal("")),
  keluhan: z.string().min(5, {
    message: "Keluhan minimal 5 karakter.",
  }),
  saran: z.string().optional().or(z.literal("")),
  files: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/heic"].includes(file.type),
          { message: "Hanya format JPG, PNG, atau HEIC yang diperbolehkan." }
        )
        .refine((file) => file.size <= 10 * 1024 * 1024, {
          message: "Ukuran tiap file maksimal 10MB.",
        })
    )
    .max(5, { message: "Maksimal 5 file gambar." })
    .optional(),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama_lengkap: "",
      nim: "",
      nomor_telepon: "",
      keluhan: "",
      saran: "",
      files: [],
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const formData = new FormData();
      formData.append("nama_lengkap", values.nama_lengkap || "");
      formData.append("nim", values.nim || "");
      formData.append("nomor_telepon", values.nomor_telepon || "");
      formData.append("keluhan", values.keluhan);
      formData.append("saran", values.saran || "");

      if (values.files && values.files.length > 0) {
        values.files.forEach((file) => {
          formData.append("files[]", file);
        });
      }

      const res = await fetch(
        "https://satgas.sga-cakrawala.org/api/documentation",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Gagal menyimpan data");

      const data = await res.json();

      toast.success("Data berhasil dikirim 🎉", {
        description: `Keluhan berhasil tersimpan dengan id ${data.id}`,
      });
    } catch (error: any) {
      console.error("Error KOnolll form:", error);
      toast.error("Terjadi kesalahan 🚨", {
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 px-64 py-16"
      >
        <FormField
          control={form.control}
          name="nama_lengkap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Mahasiswa</FormLabel>
              <FormControl>
                <Input placeholder="Tuliskan nama Anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIM</FormLabel>
              <FormControl>
                <Input placeholder="Silahkan masukan NIM Anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nomor_telepon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telpon</FormLabel>
              <FormControl>
                <Input
                  placeholder="Silahkan masukan Nomor Telpon Anda"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keluhan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Keluhan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  required
                  placeholder="Silahkan masukan keluhan Anda"
                  className="min-h-32 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="saran"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saran/Harapan Anda</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Silahkan berikan saran atau harapan Anda"
                  className="min-h-32 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bukti Foto{" "}
                {/* <span className="text-sm text-gray-500">
                  (JPG, PNG, HEIC – Maks. 10MB, Maks. 5 file)
                </span> */}
              </FormLabel>
              <FormControl>
                <div className="flex relative border border-blue-600 border-dashed rounded-md h-52 justify-center bg-blue-50 hover:bg-blue-100 transition cursor-pointer">
                  <Input
                    id="buktiFotoInput"
                    type="file"
                    accept=".jpg,.jpeg,.png,.heic"
                    multiple
                    onChange={(e) =>
                      field.onChange(
                        e.target.files ? Array.from(e.target.files) : []
                      )
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center py-10 rounded-md cursor-pointer">
                    <img src={ImgFile} className="w-12 h-12 mb-2.5" />
                    <label htmlFor="buktiFotoInput">
                      Drag & drop foto di sini atau pilih file Format: JPG, PNG,
                      HEIC (Maks. 10MB)
                    </label>
                    {field.value && field.value.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                        {field.value.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-2 border-red-400 hover:bg-red-600 py-3.5 px-14 text-black hover:text-white"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="border-2 border-yellow-400 hover:bg-yellow-500 bg-white py-3.5 px-14 text-black hover:text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
