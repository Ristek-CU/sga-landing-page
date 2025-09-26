import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ImgFile from "@/assets/images/group.png";
import CancelIcon from "@/components/ui/cancel.tsx";
import Button from "../ui/button.tsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Textarea } from "../ui/textarea.tsx";

const FormSchema = z.object({
	nama_lengkap: z.string().optional().or(z.literal("")),
	nim: z.string().optional().or(z.literal("")),
	nomor_telpon: z.string().optional().or(z.literal("")),
	keluhan: z.string().min(5, {
		message: "Keluhan harus berisi minimal 5 karakter.",
	}),
	saran: z.string().optional().or(z.literal("")),
	files: z
		.array(
			z
				.file()
				.mime(["image/jpeg", "image/png", "image/heic"], {
					message: "Hanya format JPG, PNG, atau HEIC yang diperbolehkan.",
				})
				.max(10 * 1024 * 1024, {
					message: "Ukuran tiap file maksimal 10MB.",
				}),
		)
		.max(5, { message: "Maksimal 5 file gambar." })
		.optional(),
});

export default function ReportingForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nama_lengkap: "",
			nim: "",
			nomor_telpon: "",
			keluhan: "",
			saran: "",
			files: [],
		},
	});

	const images = form.watch("files");

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const formData = new FormData();
		formData.append("nama_lengkap", values.nama_lengkap || "");
		formData.append("nim", values.nim || "");
		formData.append("nomor_telpon", values.nomor_telpon || "");
		formData.append("keluhan", values.keluhan);
		formData.append("saran", values.saran || "");

		formData.append("status", "not started");
		formData.append("metode_report", "online");
		formData.append("created_by", "api_user");

		if (values.files && values.files.length > 0) {
			values.files.forEach((file) => {
				formData.append("files[]", file);
			});
		}

		await toast
			.promise(
				fetch("https://satgas.sga-cakrawala.org/api/v1/reports", {
					method: "POST",
					body: formData,
					headers: new Headers({
						Accept: "application/json",
					}),
				}).then((res) => {
					if (!res.ok) throw new Error("Gagal menyimpan data");
				}),
				{
					loading: "Menyimpan data...",
					success: () => {
						form.reset();

						return {
							message: "Data berhasil dikirim 🎉",
							description: "Keluhan berhasil tersimpan",
							duration: 2000,
						};
					},
					error: (error) => {
						const description =
							error instanceof Error ? error.message : "Terjadi kesalahan";

						return {
							message: "Terjadi kesalahan 🚨",
							description,
							duration: 2000,
						};
					},
				},
			)
			.unwrap();
	};

	const formatFileName = (name: string, maxLength = 20) => {
		if (name.length <= maxLength) return name;
		const ext = name.split(".").pop();

		return name.slice(0, maxLength - ext!.length - 3) + "..." + ext;
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="px-64 py-16 space-y-6 w-full"
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
					name="nomor_telpon"
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
									className="resize-none min-h-32"
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
									className="resize-none min-h-32"
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
							<FormLabel>Bukti Foto</FormLabel>
							<FormControl>
								<div className="flex relative justify-center h-52 bg-blue-50 rounded-md border border-blue-600 border-dashed transition cursor-pointer hover:bg-blue-100">
									<Input
										id="buktiFotoInput"
										type="file"
										accept=".jpg,.jpeg,.png,.heic"
										multiple
										onChange={(e) => {
											const files = Array.from(e.target.files ?? []);
											const allFiles = [...(field.value || []), ...files];

											if (allFiles.length > 5) {
												toast.error("Maksimal 5 file gambar.", {
													description:
														"Anda telah melebihi batas maksimal unggah file gambar.",
													duration: 2000,
												});
												return;
											}

											field.onChange(allFiles);
										}}
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									/>

									<div className="flex flex-col items-center py-10 rounded-md cursor-pointer">
										<img src={ImgFile} className="w-12 h-12 mb-2.5" />
										<label htmlFor="buktiFotoInput">
											Pilih file Format: JPG, PNG, HEIC (Maks. 10MB)
										</label>
										<div className="flex flex-wrap justify-center gap-2 w-[1200px] mt-3 z-10">
											{images?.map((file, index) => (
												<div
													key={index}
													className="flex justify-between items-center px-3 py-2 bg-white rounded-md border shadow-sm max-w-fit w-3xs"
												>
													<div className="flex items-center gap-2 max-w-[220px] overflow-hidden">
														<img
															src={ImgFile}
															alt="default-icon"
															className="w-5 h-5 shrink-0"
														/>
														<span className="text-sm">
															{formatFileName(file.name)}
														</span>
													</div>

													<button
														type="button"
														className="text-sm text-red-500 cursor-pointer hover:underline"
														onClick={() => {
															const updatedFiles = (field.value || []).filter(
																(_, i) => i !== index,
															);
															field.onChange(updatedFiles);
														}}
													>
														<CancelIcon />
													</button>
												</div>
											))}
										</div>
									</div>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 justify-end">
					<Button
						type="button"
						disabled={form.formState.isSubmitting || !form.formState.isDirty}
						variant="outline"
						className="border-2 border-red-400 hover:border-red-600 hover:bg-red-600 py-3.5 px-14 text-black hover:text-white cursor-pointer"
						onClick={() => form.reset()}
					>
						Reset
					</Button>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting || !form.formState.isDirty}
						className="border-2 border-yellow-400 hover:border-yellow-500 hover:bg-yellow-500 bg-white py-3.5 px-14 text-black hover:text-white cursor-pointer"
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
