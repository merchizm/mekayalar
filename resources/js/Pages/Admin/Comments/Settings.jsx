import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const toTextareaValue = (value) => {
    if (!Array.isArray(value)) {
        return '';
    }
    return value.join('\n');
};

export default function Settings({ auth, blacklist = [], bannedIps = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        blacklist: toTextareaValue(blacklist),
        banned_ips: toTextareaValue(bannedIps),
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.comments.settings.update'));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Yorum Ayarları" />

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yorum Ayarları</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Kara liste ve yasaklı IP adreslerini yönetin.
                        </p>
                    </div>
                    <Link
                        href={route('admin.comments.index')}
                        className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        Yorumlara Dön
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6 p-6">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Kara Liste (satır başına bir kelime/ifade)
                        </label>
                        <textarea
                            rows="8"
                            value={data.blacklist}
                            onChange={(event) => setData('blacklist', event.target.value)}
                            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                        {errors.blacklist && <p className="mt-1 text-xs text-red-500">{errors.blacklist}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Yasaklı IP Adresleri (satır başına bir IP)
                        </label>
                        <textarea
                            rows="6"
                            value={data.banned_ips}
                            onChange={(event) => setData('banned_ips', event.target.value)}
                            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                        {errors.banned_ips && <p className="mt-1 text-xs text-red-500">{errors.banned_ips}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
